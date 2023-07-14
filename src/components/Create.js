import React, { useState, useMemo } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Create() {

    const [name, setTitle] = useState('')
    const [created_date, setDate] = useState('')

    const navigate= useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault();
        const postobj = {name,created_date, content}
        console.log(postobj)

        fetch('http://localhost:9999/post',{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(postobj)
        }).then(resp => {
            alert('wat')
            navigate('/postmanager')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleChange = (data) => {
        setEditorState(data);
    };
    var content = useMemo(
        () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
        [editorState]
    );

    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'image'],
        inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
        },
    };

    return (
        <div>
            <form className="container-fluid" onSubmit={handlesubmit}>
                <Row>
                    <Col>
                        <Card style={{minHeight: '90vh'}}>
                            <Card.Header style={{ textAlign: 'center' }}><h2>Create Post</h2></Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={handleChange}
                                        wrapperClassName="editor-wrapper"
                                        editorClassName="message-editor"
                                        toolbarClassName="message-toolbar"
                                        toolbar={toolbarOptions}
                                    />
                                    <textarea
                                        disabled
                                        value={content}
                                        style={{width: '100%'}}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control value={name} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Publish Date</Form.Label>
                                    <Form.Control type="date" value={created_date} onChange={(e) => setDate(e.target.value)}></Form.Control>
                                </Form.Group>

                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" type="submit">Create</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </form>
        </div>



    );
}