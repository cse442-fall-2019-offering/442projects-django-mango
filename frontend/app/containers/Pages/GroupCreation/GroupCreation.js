import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const languages = [
  {
    value: 'Python',
    label: 'Python',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
  {
    value: 'Java',
    label: 'Java',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'C++',
    label: 'C++',
  },
  {
    value: 'C#',
    label: 'C#',
  },
  {
    value: 'Ruby',
    label: 'Ruby',
  },
  {
    value: 'Swift',
    label: 'Swift',
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function GroupCreation() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    groupname: 'Group Name',
    name: 'Student Name',
    email: 'Student Email',
    description: 'This Group is...',
  });

  const handleChange = groupname => event => {
    setValues({ ...values, [groupname]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-groupname"
        label="Group Name"
        className={classes.textField}
        value={values.groupname}
        onChange={handleChange('groupname')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Student Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-email"
        label="Email"
        className={classes.textField}
        values={values.email}
        onChange={handleChange('email')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-description-flexible"
        label="Description"
        multiline
        rowsMax="20"
        value={values.description}
        onChange={handleChange('description')}
        className={classes.textField}
        margin="normal"
        helperText="Group Description"
        variant="outlined"
      />
      <TextField
        id="outlined-select-language"
        select
        label="Programming Languages"
        className={classes.textField}
        value={values.languages}
        onChange={handleChange('languages')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Select Programming Language"
        margin="normal"
        variant="outlined"
      >
        {languages.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
}
