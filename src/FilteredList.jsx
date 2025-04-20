import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            type: "all",
        };
    }

    onSearch = (event) => {
        this.setState({ search: event.target.value.trim().toLowerCase() });
    }

    onSelectType = (eventKey) => {
        this.setState({ type: eventKey.toLowerCase() }); // Ensure lowercase
    }

    filterItem = (item) => {
        const matchesSearch = item.name.toLowerCase().includes(this.state.search);
        const matchesType = this.state.type === "all" || item.type.toLowerCase() === this.state.type;
        return matchesSearch && matchesType;
    }

    render() {
        return (
            <div className="filter-list">
                <h1>Produce Search</h1>

                <div className="form-group mb-3">
                    <DropdownButton
                        id="typeDropdown"
                        title={`Filter: ${this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}`}
                        onSelect={this.onSelectType}
                        className="mb-2"
                    >
                        <Dropdown.Item eventKey="all">All</Dropdown.Item>
                        <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item>
                        <Dropdown.Item eventKey="vegetable">Vegetable</Dropdown.Item>
                    </DropdownButton>

                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Search"
                        onChange={this.onSearch}
                    />
                </div>

                <List items={this.props.items.filter(this.filterItem)} />
            </div>
        );
    }
}

export default FilteredList;