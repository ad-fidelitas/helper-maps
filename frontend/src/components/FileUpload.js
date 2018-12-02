import React, {Component} from "react";
import axios from 'axios';

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            selectedFile: '',
        };
    }

    onChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();

        formData.append('file', selectedFile);

        axios.post('http://localhost:3000/upload', formData)
            .then((result) => {
            // access results...
        });
    }

    render() {
        const { selectedFile } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="file"
                    name="selectedFile"
                    onChange={this.onChange}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
  
export default FileUpload;