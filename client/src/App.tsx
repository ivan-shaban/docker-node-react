import React, {PureComponent} from 'react'
import './App.css'
import axios from 'axios'
import {
    Button,
    Card,
    Container,
    Row,
} from 'react-bootstrap'

export interface Props {
}

export interface State {
    readonly setBookName: string
    readonly setReview: string
    readonly fetchData: Array<{
        readonly id: string
        readonly book_name: string
        readonly book_review: string
    }>
    readonly reviewUpdate: string
}

class App extends PureComponent<Props, State> {
    state: State = {
        setBookName: '',
        setReview: '',
        fetchData: [],
        reviewUpdate: '',
    }

    componentDidMount() {
        axios.get('/api/get')
            .then((response) => {
                this.setState({
                    fetchData: response.data,
                })
            })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nam = event.target.name
        const val = event.target.value
        // @ts-ignore
        this.setState({
            [nam]: val,
        })
    }

    handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            reviewUpdate: event.target.value,
        })
    }
    submit = () => {
        axios.post('/api/insert', this.state)
            .then(() => {
                window.alert('success post')
            })
        console.log(this.state)
        document.location.reload()
    }

    delete = (id: string) => {
        if (window.confirm('Do you want to delete? ')) {
            axios.delete(`/api/delete/${id}`)
            document.location.reload()
        }
    }

    edit = (id: string) => {
        axios.put(`/api/update/${id}`, this.state)
        document.location.reload()
    }

    render() {
        let card = this.state.fetchData.map((val, key) => {
            return (
                <React.Fragment>
                    <Card style={{width: '18rem'}} className="m-2">
                        <Card.Body>
                            <Card.Title>{val.book_name}</Card.Title>
                            <Card.Text>
                                {val.book_review}
                            </Card.Text>
                            <input name="reviewUpdate" onChange={this.handleChange2}
                                   placeholder="Update Review" />
                            <Button className="m-2" onClick={() => {
                                this.edit(val.id)
                            }}>Update</Button>
                            <Button onClick={() => {
                                this.delete(val.id)
                            }}>Delete</Button>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            )
        })

        return (
            <div className="App">
                <h1>Dockerized Fullstack React Application</h1>
                <div className="form">
                    <input name="setBookName" placeholder="Enter Book Name" onChange={this.handleChange}/>
                    <input name="setReview" placeholder="Enter Review" onChange={this.handleChange}/>
                </div>
                <Button className="my-2" variant="primary" onClick={this.submit}>Submit</Button> <br/><br/>
                <Container>
                    <Row>
                        {card}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default App
