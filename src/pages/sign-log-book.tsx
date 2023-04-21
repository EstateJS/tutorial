import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";

// 1
import {useEstateClient} from "estate-react";
import {Entry, LogBook} from 'log-book-service';

export default function SignLogBook() {
    const [name, setName] = useState<string>();
    const [date, setDate] = useState<Date>();
    const [redirect, setRedirect] = useState<Boolean>(false);

    // 2
    const estate = useEstateClient();
    const logBook = estate.getWorker(LogBook, "default");

    function handleOnSubmit(e: any) {
        e.preventDefault();

        // 3
        const entry = new Entry(name!, date!);        
        logBook.addEntry(entry)
            .then(() => {
                setRedirect(true);
            }).catch((reason: any) => {
                console.error(reason)
            });
    }

    if(redirect) {
        return (<Navigate replace to="/"/>);
    }

    return (
        <div>
            <h3>Sign the Visitor's Log</h3>            
            <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                           required
                           className="form-control"
                           value={name ?? ""}
                           onChange={(e:any) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            required
                            selected={date}
                            onChange={(d) => setDate(d!)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Sign" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}
