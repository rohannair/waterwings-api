// Deps
import React, { Component } from 'react';
import { find, findIndex } from 'lodash';

// CSS
import styles from './slideEquipment.css';

// SubComponents
import SlideEquipmentHeader from '../SlideEquipmentHeader';
import SlideEquipmentBody from '../SlideEquipmentBody';
import { updatePlaybookState } from '../../actions/playbookViewActions';
import TextBox from '../TextBox';

class SlideEquipment extends Component {
  state = {
    options: this.props.body.options || [],
    selected: null,
    textAlign: this.props.body.textAlign || 'left'
  };

  render() {
    const { options, textAlign } = this.state;
    const { slide_number, body } = this.props;

    const names = options.map(val => ({ id: val.id, name: val.name }));

    const selected = this.state.selected
      ? (options
        .filter(val => val.id === this.state.selected))[0]
      : this.state.options[0];

    return (
      <div className="slideEquipment">
        <div className="slide-input">
          <strong>Heading:</strong>
          <input
            name="heading"
            value={this.props.heading}
            onChange={ e => this._updateEquipmentState(e.target.name, e.target.value) }
          />
        </div>
        <div className="equipmentTextBox">
          <TextBox slideNum={ slide_number } body={ body } textAlign={ this.state.textAlign } bodyKey="desc" updateSlide={ this._updateEquipmentState } />
        </div>
        <SlideEquipmentHeader
          vals={ names }
          onClick={ this._setSelected }
          onNew={ this._newOption }
          onEdit={ this._editOption }
          onRemove={ this._removeOption }
          selected={ selected.id }
        />

        <SlideEquipmentBody
          opt={ selected }
          newOption={ this._newSubOption }
          editOption={ this._editSubOption }
          deleteOption={ this._removeSubOption }
        />
      </div>
    );
  };

  _updateEquipmentState = (key, value) => {
    const { body, slide_number, onChange } = this.props;
    let updatedSlide = null;
    let slideKey = null;
    if (Object.keys(this.props).indexOf(key) > -1) {
      updatedSlide = value;
      slideKey = key;
    } else {
      updatedSlide = {
        ...body,
        [key]: value
      };
      slideKey = 'body';
    }
    return onChange(slideKey, updatedSlide, slide_number);
  };

  _setSelected = (key) => {
    this.setState({
      selected: key
    });
  };

  _newOption = () => {
    const newOptionID = 'xxx' + Math.floor(Math.random() * (99999 - 10000)) + 10000;
    const newOptions = {
      name: 'New',
      id: newOptionID,
      opts: [
        'New Id'
      ],
      optNames: [
        'New Label'
      ]
    };
    const { options } = this.state;

    this.setState({
      options:  [
        ...options,
        newOptions
      ]
    });

    const newAddOptions = [
      ...options,
      newOptions
    ];
    this._updateEquipmentState('options', newAddOptions);
  };

  _editOption = (key, newName) => {
    const { options } = this.state;

    const opt = find(options, (o) => o.id === key);
    const optIndex = findIndex(options, (o) => o.id === key);

    const newOption = {
      ...opt,
      name: newName
    };

    const newOptions = [
      ...options.slice(0, optIndex),
      newOption,
      ...options.slice(optIndex + 1)
    ];

    this.setState({
      options: newOptions
    });
    this._updateEquipmentState('options', newOptions);
  };

  _removeOption = (key) => {
    const options = [...this.state.options]
    .filter(val => {
      return val.id !== key;
    });

    this.setState({
      options
    });

    this._updateEquipmentState('options', options);

    if (this.state.selected === key) {
      this.setState({
        selected: null
      });
    };
  };

  _editSubOption = (key, value, ind) => {
    const { options } = this.state;
    const selected = this.state.selected
      ? (options
        .filter(val => val.id === this.state.selected))[0]
      : this.state.options[0];
    const pos = options.indexOf(selected);
    const newOption = {
      ...selected,
      [key]: [
        ...selected[key].slice(0, ind),
        value,
        ...selected[key].slice(ind + 1)
      ]
    };

    const newOptions = [
      ...options.slice(0, pos),
      newOption,
      ...options.slice(pos + 1)
    ];

    this.setState({
      options: newOptions
    });
    this._updateEquipmentState('options', newOptions);
  };

  _removeSubOption = (ind, key) => {
    const { options } = this.state;
    let selectedIdIndex = 0;
    let selectedKeyIndex = 0;

    const optToChange = options.reduce((prev, val, i) => {
      let mergeable = null;
      if (val.id === ind) {
        selectedIdIndex = i;
        mergeable = val;
      };

      return { ...prev, ...mergeable };
    });

    const opts = [...optToChange.opts].filter((val, i) => {
      if (val === key) {
        selectedKeyIndex = i;
        return null;
      }
      return val;
    });

    const optNames = [...optToChange.optNames].filter((val, i) => i !== selectedKeyIndex);

    let newOpt = {
      ...optToChange,
      opts,
      optNames
    };

    const newRemOpt = [
      ...options.slice(0, selectedIdIndex),
      newOpt,
      ...options.slice(selectedIdIndex + 1),
    ];

    this.setState({
      options: newRemOpt
    });

    this._updateEquipmentState('options', newRemOpt);
  };

  _newSubOption = (ind) => {
    const { options } = this.state;
    let selectedIndex = 0;

    const optToChange = options.reduce((prev, val, i) => {
      let mergeable = null;
      if (val.id === ind) {
        selectedIndex = i;
        mergeable = val;
      }
      return { ...prev, ...mergeable };
    });

    const optNames = [
      ...optToChange.optNames,
      'New Option'
    ];

    const opts = [
      ...optToChange.opts,
      `opt-${Math.random()}`
    ];

    const newOpt = {
      ...optToChange,
      optNames,
      opts
    };

    const newAddOption = [
      ...options.slice(0, selectedIndex),
      newOpt,
      ...options.slice(selectedIndex + 1),
    ];

    this.setState({
      options: newAddOption
    });

    this._updateEquipmentState('options', newAddOption);
  };
};

export default SlideEquipment;
