import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({});

const headRows = [
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'firstName',
        label: 'Voornaam',
    },
    {
        id: 'lastName',
        label: 'Achternaam',
    },
    {
        id: 'groupId',
        label: 'Groep',
    },
];

@withStyles(styles)
class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        const { onRequestSort } = this.props;

        onRequestSort(event, property);
    };

    render() {
        const { sortField, sortDirection } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell padding="checkbox" />
                    {headRows.map(row => (
                        <TableCell
                            key={row.id}
                            align={row.numeric ? 'right' : 'left'}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={
                                sortField === row.id ? sortDirection : false
                            }
                        >
                            <TableSortLabel
                                active={sortField === row.id}
                                direction={sortDirection}
                                onClick={this.createSortHandler(row.id)}
                            >
                                {row.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

export default EnhancedTableHead;
