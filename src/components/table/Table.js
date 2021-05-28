import React from "react"



class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            name:this.props.name,
            age: this.props.age,
        }
    }

        edit = () => {
            this.setState({ editable: true });
        };

        remove = () => {
            this.props.remove(this.props.index);
        };

        save = () => {
            this.props.update(this.state.name, this.state.age, this.props.index)
            this.setState({ editable: false });
        };

        setEditableRow = () => {
            return (
                <tr className="row">
                    <th> <input className="posts-form__input" ref="newName" defaultValue={this.props.name} 
                    onChange={ev=>{this.setState({name:ev.target.value})}}/> </th>
                    <th>  <input className="posts-form__input" ref="newSecondName" defaultValue={this.props.id} 
                     onChange={ev=>{this.setState({age:ev.target.value})}}/> </th>
                    <th>
                        <button className="" onClick={this.save} >
                            Save
                       </button>
                    </th>
                </tr>

            );
        };

        setUneditableRow = () => {
            return (
                <tr className="row">
                    <th> <input className="posts-form__input" defaultValue={this.props.name} disabled='disabled' /> </th>
                    <th> <input className="posts-form__input" defaultValue={this.props.age} disabled='disabled' /> </th>
                    <th>
                        <div className="buttons">
                            <button onClick={this.edit}>
                                Edit
                                </button>
                            <button onClick={this.remove}>
                                Delete
                                </button>
                        </div>
                    </th>
                </tr>
            );
        };
    
    render() {
       // <Header/>
        if (this.state.editable) {
            return this.setEditableRow();
        } else {
            return this.setUneditableRow();
        }
    }
}

export default Table;