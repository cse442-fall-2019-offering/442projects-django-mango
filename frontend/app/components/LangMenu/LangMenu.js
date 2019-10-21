import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLanguages } from 'my-actions/languagesActions';
import { makeSelectLanguages } from 'my-selectors/languagesSelectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MultiSelect from '@khanacademy/react-multi-select';

function createOptions(list) {
  const output = [];
  list.forEach(function(element) {
    output.push({ label: element, value: element });
  });
  return output;
}

class LangMenu extends Component {
  state = {
    languages: [],
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.languages.length < 1) {
      return {
        loading: true,
      };
    }
    if (prevState.languages.length === 0) {
      return {
        languages: createOptions(props.languages),
        loading: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { onGetLanguages } = this.props;
    onGetLanguages();
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    const { selectedLanguages, onLanguagesChange } = this.props;
    const { languages } = this.state;

    return (
      <MultiSelect
        options={languages}
        selected={selectedLanguages}
        onSelectedChanged={selected => onLanguagesChange(selected)}
        overrideStrings={{
          selectSomeItems: 'Programming Languages',
          allItemsAreSelected: 'All Languages are Selected',
          selectAll: 'Select All',
          search: 'Search',
        }}
      />
    );
  }
}

LangMenu.propTypes = {
  onGetLanguages: PropTypes.func.isRequired,
  selectedLanguages: PropTypes.array.isRequired,
  onLanguagesChange: PropTypes.func.isRequired,
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

export default LangMenuMapped;
