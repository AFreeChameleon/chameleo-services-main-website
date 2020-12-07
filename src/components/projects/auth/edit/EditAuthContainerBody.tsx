import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    setProjectValue
} from '../../../../redux/projects/auth/edit/project/actions';
import {
    fetchConfig
} from '../../../../redux/projects/auth/edit/config/actions';

class EditAuthContainerBody extends React.Component {
    constructor(props) {
        super(props);
        const { project, dispatchFetchConfig }: any = this.props;
        dispatchFetchConfig(project.project_id);
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        config: state.config
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchConfig: (project_id: string) => dispatch(fetchConfig(project_id)),
        dispatchSetProjectValue: (key: string, value) => dispatch(setProjectValue(key, value))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(EditAuthContainerBody);