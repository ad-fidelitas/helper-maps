import React from "react";
import AccessibleForward from '@material-ui/icons/AccessibleForward'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack'

export default function ErrorPage(props){
    return(
        <div>
            <Link to="/">
                <Button style={{ margin: `4% 0 0 4%`, backgroundColor: `#d43a36` }} variant="fab" color="primary" aria-label="Add">
                    <ArrowBack />
                </Button>
            </Link>
            <div>
                <AccessibleForward style={{ color: `#009688`, margin: `15% 0 0 46%`, transform: `scale(15)` }} />
            </div>
            <div>
                <p style={{ color: `#009688`, margin: `15% 0 0 30%`, fontSize: `3em` }}> Oops...Page does not exist</p>
            </div>
        </div>
    )
}