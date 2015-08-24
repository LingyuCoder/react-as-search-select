import React from 'react';
import ReactMixin from 'react-mixin';
import EventMixin from 'react-as-event-mixin';

class Component extends React.Component {
  constructor(props) {
    super();
		this.state = {
			search: props.search,
			value: props.value
		};
		this._handleChange = this._handleChange.bind(this);
		this._handleSearchChange = this._handleSearchChange.bind(this);
		this._matchSearch = this._matchSearch.bind(this);
  }
  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    search: React.PropTypes.string,
    data: React.PropTypes.array(React.PropTypes.object),
    onChange: React.PropTypes.func,
    onSearchChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    height: React.PropTypes.number
  }
  static defaultProps = {
    value: '',
    search: '',
    data: [],
    onChange: () => {},
    onSearchChange: () => {},
    placeholder: '请输入过滤条件',
    height: 400
  }
  getValue() {
    return this.state.value;
  }
  setValue(newValue) {
    this.setState({
      value: newValue
    });
    return this;
  }
  componentWillReceiveProps(nextProps) {
		var state = {};
		nextProps.value !== void(0) && (state.value = nextProps.value);
    nextProps.search !== void(0) && (state.search = nextProps.search);
		this.setState(state);
  }
  _handleChange(e) {
    var data = this.props.data[parseInt(e.currentTarget.getAttribute('data-index'))];
    if(data.value === this.state.value) return;
    this.setState({
      value: data.value
    });
    this.fireAll('change', data);
  }
  _handleSearchChange(e) {
    var search = e.target.value || '';
    this.setState({
      search: search
    });
    this.fireAll('searchChange', search);
  }
  _matchSearch(item, search) {
		search = search || '';
    if(item.text.toString().toUpperCase().indexOf(search.trim().toUpperCase()) !== -1)
      return true;
    if(item.index && item.index.toString().toUpperCase().indexOf(search.toUpperCase()) !== -1)
      return true;
    return false;
  }
  render() {
    var needIndex = this.props.data.some(item => !!item.index);
    return (
      <div className="react-as-search-select" style={{maxHeight: this.props.height}}>
        { this.props.title && <div className="search-title">{this.props.title}</div> }
        { this.props.name && <input type="hidden" name={this.props.name} value={this.state.value}/> }
        <input placeholder={this.props.placeholder} className="search-text" value={this.state.search} onChange={this._handleSearchChange}></input>
        <ul className="search-list">
          {
            this.props.data
              .map((item, index) => this._matchSearch(item, this.state.search) && (
                <li className={'search-item' + (item.value === this.state.value ? ' selected' : '')} data-index={index} onClick={this._handleChange}>
                  { needIndex && <span className={'search-item-index' + (item.index ? '' : ' empty')}>{item.index}</span>}
                  { item.text }
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

ReactMixin(Component.prototype, EventMixin);

export default Component;
