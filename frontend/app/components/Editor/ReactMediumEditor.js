import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const MediumEditor = require('medium-editor');

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

const toolbar = {
  buttons: [
    'bold',
    'italic',
    'underline',
    'anchor',
    'quote',
    'strikethrough',
    'next',
  ],
};

const toolbar2 = {
  buttons: ['previous', 'h1', 'h2', 'h3', 'h4', 'subscript', 'superscript'],
};

class ReactMediumEditor extends Component {
  static defaultProps = {
    tag: 'div',
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text,
      // eslint-disable-next-line react/no-unused-state
      toolbar,
      changed: true,
    };
  }

  componentDidMount() {
    const that = this;
    const NextButton = MediumEditor.Extension.extend({
      name: 'next',

      init() {
        this.button = this.document.createElement('button');
        this.button.classList.add('medium-editor-action');
        this.button.innerHTML = '<b>•••</b>';
        this.button.title = 'next';
        this.on(this.button, 'click', this.handleClick.bind(this));
      },

      getButton() {
        return this.button;
      },

      handleClick() {
        that.setState({
          toolbar: toolbar2,
          changed: true,
        });
      },
    });
    // eslint-disable-next-line react/no-find-dom-node
    const dom = ReactDOM.findDOMNode(this);
    this.medium = new MediumEditor(dom, {
      toolbar: that.state.toolbar,
      placeholder: {
        text: this.props.placeholder,
      },
      extensions: {
        next: new NextButton(),
      },
    });
    this.medium.subscribe('editableInput', () => {
      this.updated = true;
      this.change(dom.innerHTML);
    });
  }

  componentDidUpdate() {
    if (this.state.changed) {
      const that = this;
      const NextButton = MediumEditor.Extension.extend({
        name: 'next',

        init() {
          this.button = this.document.createElement('button');
          this.button.classList.add('medium-editor-action');
          this.button.innerHTML = '<b>•••</b>';
          this.button.title = 'next';
          this.on(this.button, 'click', this.handleClick.bind(this));
        },

        getButton() {
          return this.button;
        },

        handleClick() {
          that.setState({
            toolbar: toolbar2,
            changed: true,
          });
        },
      });

      const PreviousButton = MediumEditor.Extension.extend({
        name: 'previous',

        init() {
          this.button = this.document.createElement('button');
          this.button.classList.add('medium-editor-action');
          this.button.innerHTML = '<b>•••</b>';
          this.button.title = 'previous';
          this.on(this.button, 'click', this.handleClick.bind(this));
        },

        getButton() {
          return this.button;
        },

        handleClick() {
          that.setState({
            toolbar,
            changed: true,
          });
        },
      });
      const selection = this.medium.exportSelection();
      // eslint-disable-next-line react/no-find-dom-node
      const dom = ReactDOM.findDOMNode(this);
      this.medium.destroy();
      this.medium = new MediumEditor(dom, {
        toolbar: that.state.toolbar,
        placeholder: {
          text: this.props.placeholder,
        },
        extensions: {
          next: new NextButton(),
          previous: new PreviousButton(),
        },
      });
      this.medium.subscribe('editableInput', () => {
        this.updated = true;
        this.change(dom.innerHTML);
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        changed: false,
      });
      this.medium.importSelection(selection, false);
    }
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this.updated) {
      this.setState({ text: nextProps.text });
    }

    if (this.updated) this.updated = false;
  }

  render() {
    const { text, tag, dangerouslySetInnerHTML, ...props } = this.props;
    props.dangerouslySetInnerHTML = { __html: this.state.text };

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, props);
  }

  change(text) {
    this.props.onChange(text);
  }
}

ReactMediumEditor.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  dangerouslySetInnerHTML: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default ReactMediumEditor;
