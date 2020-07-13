import React, { Component } from "react";
import axios from "axios";


class loForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: [],
            cong: [],
            techformate: [],
            instructRole: [],
            title: '',
            conceptId: '',
            language: '',
            cognitive: '',
            complexity: '',
            url: '',
            instructionalrole: '',
            technicalformat: '',
            ownershipId: '' , 
            file:''
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/moduleData')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    lang: json.languages,
                    cong: json.cognitives,
                    instructRole: json.instructionalroles,
                    techformate: json.technicalformats
                })
            })
    }


    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        },
        );

    }

    submitHandler = e => {
        e.preventDefault();
        var ob = {
            title: this.state.title,
            conceptId: this.state.conceptId,
            language: this.state.language,
            cognitive: this.state.cognitive,
            complexity: this.state.complexity,
            url: this.state.url,
            instructionalrole: this.state.instructionalrole,
            technicalformat: this.state.technicalformat,
            image : this.state.image 
        }

      
        axios.post('http://localhost:4000/api/los', ob)
            .then(response => { console.log(response) })
            .catch(error => {console.log(ob)  ;console.log(error) })
    }

    render() {

        var { lang, cong, techformate, instructRole
            , title,
            conceptId,
            language,
            cognitive,
            complexity,
            url,
            instructionalrole,
            technicalformat,
            file
        
        } = this.state;
        return (
            <div className="container bg-white p-3 m-auto col-8">

                <form onSubmit={this.submitHandler}  enctype="multipart/form-data" autoComplete="off">
                    <fieldset className="border p-3">
                        <legend className="w-auto p-2">Create New LO</legend>

                        <input type="hidden" name="_id" />
                        <div className="form-group">
                            <label htmlFor="">title <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="title" placeholder="title" value={title} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="conceptId"> conceptId <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="conceptId" placeholder="conceptId" value={conceptId} onChange={this.changeHandler} />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="language"> lang: <span className="text-danger">*</span> </label>
                                <select name="language" id="language" className="form-control" value={language} onChange={this.changeHandler} >
                                    <option value='' disabled> select lang</option>
                                    {
                                        Object.keys(lang).map(key =>
                                            <option key={key} value={lang[key]}>{key} </option>
                                        )}

                                </select>

                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="cognitive"> cognitives:<span className="text-danger">*</span></label>
                                <select name="cognitive" id="cognitive" className="form-control" value={cognitive} onChange={this.changeHandler}>
                                    <option value='' disabled> select cognitive</option>
                                    {
                                        Object.keys(cong).map(key =>
                                            <option key={key} value={cong[key]}>{key} </option>
                                        )}

                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="complexity"> complexity <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="complexity" placeholder="complexity" value={complexity} onChange={this.changeHandler} />
                            </div>

                            <div className="form-group col-md-8">
                                <label htmlFor="url"> URL <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="url" placeholder="url" value={url} onChange={this.changeHandler} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="instructionalrole"> instructionalrole: <span className="text-danger">*</span></label>
                                <select name="instructionalrole" id="instructionalrole" className="form-control" value={instructionalrole} onChange={this.changeHandler}>
                                    <option value='' disabled> select instructionalrole</option>
                                    {
                                        Object.keys(instructRole).map(key =>
                                            <option key={key} value={instructRole[key]}>{key} </option>
                                        )}
                                </select>

                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="technicalformat"> technicalformat:<span className="text-danger">*</span></label>
                                <select name="technicalformat" id="technicalformat" className="form-control" value={technicalformat} onChange={this.changeHandler}>
                                    <option value='' disabled> select technicalformat</option>
                                    {
                                        Object.keys(techformate).map(key =>
                                            <option key={key} value={techformate[key]}>{key} </option>
                                        )}

                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customFile" name="file" onChange={this.changeHandler} value={file}/>
                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                            </div>
                        </div>

                        <div className="form-group offset-sm-5">
                            <button type="submit" className="btn btn-info"><i className="fa fa-database"></i> Submit</button>
                        </div>
                    </fieldset>

                </form>
            </div>

        );
    }
}


export default loForm;