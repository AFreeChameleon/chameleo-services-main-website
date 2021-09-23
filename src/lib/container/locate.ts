export const getDBFromLocation = (location: string) => {
    switch (location) {
        case 'London':
            return 'postgresql://localhost/chameleo-services-auth'
    }
}