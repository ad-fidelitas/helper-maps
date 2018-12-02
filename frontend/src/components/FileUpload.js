import React, {Component} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack'
import NavigationIcon from '@material-ui/icons/Navigation';


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
        const styles = theme => ({
            button: {
              margin: theme.spacing.unit,
            },
            extendedIcon: {
            //   marginRight: theme.spacing.unit,
            },
          });

        return (
            <div>
                <div>
                    <Link to="/">
                        <Button style={{ margin: `4% 0 0 4%`, backgroundColor: `#d43a36` }} variant="fab" color="primary" aria-label="Add">
                            <ArrowBack />
                        </Button>
                    </Link>
                </div>
                <div style={{ margin: `10% 43%` }}>
                    <form onSubmit={this.onSubmit} >
                        <input
                            type="file"
                            name="selectedFile"
                            onChange={this.onChange}
                        />
                        <Button style={{ backgroundColor: `#009688`, color: `#fff`, marginTop: `30px` }} variant="extendedFab" aria-label="Delete" className={styles.button} type="submit">
                            <NavigationIcon className={styles.extendedIcon} />
                            <b>Submit</b>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
  
export default FileUpload;