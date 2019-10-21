import React, { Component } from 'react';
import { withStyles, styles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { getLanguages } from 'my-actions/languagesActions';
import { makeSelectLanguages } from 'my-selectors/languagesSelectors';
import { connect } from 'react-redux';
import Loading from 'my-components/Loading';
import { createStructuredSelector } from 'reselect';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(language, languageName, theme) {
  return {
    fontWeight:
      languageName.indexOf(language) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = styles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

class LangMenu extends Component {
  state = {
    languages: [],
  };

  static getDerivedStateFromProps(props) {
    if (props.languages.length < 1) {
      return {
        loading: true,
      };
    }
    return {
      languages: props.languages,
      loading: false,
    };
  }

  componentDidMount() {
    const { onGetLanguages } = this.props;
    onGetLanguages();
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;
    const theme = useTheme();
    const { languages } = this.state;
    const [languageName, setLanguageName] = React.useState([]);

    const handleChange = event => {
      setLanguageName(event.target.value);
    };

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Languages</InputLabel>
          <Select
            multiple
            value={languageName}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {languages.map(language => (
              <MenuItem
                key={language}
                value={language}
                style={getStyles(language, languageName, theme)}
              >
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

LangMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetLanguages: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  languages: makeSelectLanguages(),
});

const mapDispatchToProps = dispatch => ({
  onGetLanguages: () => dispatch(getLanguages()),
});

const LangMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LangMenu);

export default withStyles(styles)(LangMenuMapped);
