import React, { Component } from 'react';
import { ListView } from 'react-native';
import ListItem from './ListItem';
import { connect } from 'react-redux';

class LibraryList extends Component {
    componentWillMount() {
        const lv = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = lv.cloneWithRows(this.props.libraries);
    }

    renderRow(library) {
        return <ListItem library={library} />
    }

    render() {
        return (
            <ListView 
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
};

const mapStateToProps = state => {
    return { libraries: state.libraries };
};

export default connect(mapStateToProps)(LibraryList);