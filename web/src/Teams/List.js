/* @flow */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import type { User, Team } from '../types';

class List extends React.Component {

  props: {
    userId: string,
    teams: Array<Team>,
  };

  onDelete(teamId: string) {
    console.log(`delete ${teamId}`);
  }

  renderUser(user: User) {
    return (
      <Avatar
        key={user.id}
        title={user.login}
        src={user.avatar_url}
        style={{ marginRight: '5px' }}
      />
    );
  }

  renderActions(team: Team) {
    if (team.owner_id !== this.props.userId) {
      return null;
    }

    return (
      <span>
        <Link to={`/teams/${team.id}/edit`}>
          <EditIcon title="Edit this team" />
        </Link>
        <IconButton onTouchTap={this.onDelete.bind(this, team.id)}>
          <DeleteIcon title="Delete this team" />
        </IconButton>
      </span>
    );
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Projects</TableHeaderColumn>
            <TableHeaderColumn>Members</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={false}
        >
        {this.props.teams.map(team => (
          <TableRow key={team.id}>
            <TableRowColumn>{team.name}</TableRowColumn>
            <TableRowColumn>{team.projects.join(', ')}</TableRowColumn>
            <TableRowColumn>
              {team.users.map(u => this.renderUser(u))}
            </TableRowColumn>
            <TableRowColumn>
              {this.renderActions(team)}
            </TableRowColumn>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    );
  }
}
export default List;
