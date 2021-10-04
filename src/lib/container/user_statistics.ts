import { Container, Prisma, User } from '.prisma/client';
import { getConnection } from '../db';

export const getAllUsersStatistics = async (user: User, container: Container, done: any) => {
    const client: any = await getConnection(container.location);
    const config = container.config as any;
    let statsLimitDate = new Date();
    statsLimitDate.setMonth(statsLimitDate.getMonth() - 1);
    const columnNames = config.model.map((r) => r.name);
    const passwordColumnName = config.model.find((r) => r.attributes.includes('Password')).name;
    const usersPromise = client.query(`
        SELECT 
            u.id,
            ${columnNames.filter(n => n !== passwordColumnName).map(n => `u."${n}"`).join(', ')},
            u.oauth,
            u.verified,
            u.status, 
            s1."ipAddress", 
            s1.device, 
            s1.browser, 
            s1.os, 
            s1.platform,
            s1."loggedInDate", 
            u."createdAt",
            u."updatedAt"
        FROM ${user!.db_schema}.users u
        JOIN ${user!.db_schema}.statistics s1 ON (u.id = s1."userId")
        LEFT OUTER JOIN ${user!.db_schema}.statistics s2 on (u.id = s2."userId" AND
        (s1."loggedInDate" < s2."loggedInDate" OR (s1."loggedInDate" = s2."loggedInDate" AND s1.id < s2.id)))
        WHERE s2.id IS NULL;
    `);
    // Here for when we put a limit on usersPromise
    const userCountPromise = client.query(`
        SELECT COUNT(id)
        FROM ${user!.db_schema}.users;
    `);
    const activeUsersPromise = client.query(`
        SELECT 
            COUNT(users.id)
        FROM 
            ${user!.db_schema}.users,
            ${user!.db_schema}.statistics s
        WHERE 
            status = 'Online'
        AND
            s."loggedInDate" >= '${statsLimitDate.toISOString()}'

        UNION ALL
        SELECT 
            COUNT(users.id)
        FROM 
            ${user!.db_schema}.users,
            ${user!.db_schema}.statistics s
        WHERE 
            status = 'Away' 
        AND 
            s."loggedInDate" >= '${statsLimitDate.toISOString()}'

        UNION ALL
        SELECT 
            COUNT(users.id)
        FROM
            ${user!.db_schema}.users,
            ${user!.db_schema}.statistics s
        WHERE 
            status = 'Offline' 
        AND 
            s."loggedInDate" >= '${statsLimitDate.toISOString()}';
    `);
    const userStatsPromise = client.query(`
        SELECT 
            statistics."userId",
            statistics."loggedInDate",
            statistics."ipAddress",
            statistics.device,
            statistics.browser,
            statistics.os,
            statistics.platform
        FROM ${user!.db_schema}.statistics
        WHERE statistics."loggedInDate" >= '${statsLimitDate.toISOString()}';
    `);
    const emailSentPromise = client.query(`
        SELECT
            emails."fromAddress",
            emails."toAddress",
            emails.subject,
            emails.html,
            emails."createdAt",
            emails."updatedAt"
        FROM ${user!.db_schema}.emails
        WHERE emails."createdAt" >= '${statsLimitDate.toISOString()}';
    `);
    const emailCountPromise = client.query(`
        SELECT COUNT(id)
        FROM ${user!.db_schema}.emails
        WHERE emails."createdAt" >= '${statsLimitDate.toISOString()}';
    `);
    
    Promise.all([
        usersPromise, 
        userCountPromise, 
        activeUsersPromise, 
        userStatsPromise, 
        emailSentPromise,
        emailCountPromise
    ])
    .then(done)
    .catch(err => { 
        console.log(err); 
    });
}