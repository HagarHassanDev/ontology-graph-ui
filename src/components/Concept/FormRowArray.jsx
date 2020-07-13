import React, { Component } from "react";

class FormRow extends Component {
    constructor(props) {
        super(props);
    }

    addItem = () => {
        this.props.addItem();
    }

    removeItem = (index, e) => {
        this.props.removeItem(index)
    }


    render() {
        return (<div>
            {this.props.items.map((rowItem, k) => (
                <div className="form-row"  >
                    <div className="form-group col-md-5">
                        <label htmlFor={`cRelation${k}`}>Relation</label>
                        <select name={`cRelation${k}`} defaultValue={''} id={`cRelation${k}`} className="form-control">
                            <option disabled value=''> select relation</option>
                            {this.props.relationList.map(item => (
                                <option key={item} value={item}>{item}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor={`withConcept${k}`}>withConcept</label>
                        <select name={`withConcept${k}`} defaultValue={''} id={`withConcept${k}`} className="form-control">
                            <option value='' disabled> select concept</option>
                            {(this.props.conceptList || []).map(item => (
                                <option key={item.conceptId} value={item.conceptId}>{item.conceptName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group align-self-sm-center mt-4">
                        <button onClick={this.addItem} type="button" className="btn btn-sm btn-outline-success m-1">+</button>
                        <button onClick={() => this.removeItem(k)} type="button" className="btn btn-sm btn-outline-danger pr-2">-</button>
                    </div>
                </div>
            ))}
        </div>


        )

    }
}

export default FormRow;










