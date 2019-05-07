import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    tasks: [
      { task: "task1" },
      { task: "task2" },
      { task: "task3" }
    ],
    value: 'ff',
    alert: false
  }

  componentDidMount = () => {
    axios.get('https://dashboard-list.firebaseio.com/tasks.json')

      .then(res => {
        const fetchedTasks = []
        for (let key in res.data) {
          fetchedTasks.push({
            ...res.data[key],
            id: key
          })
        }
        console.log(fetchedTasks);
        this.setState({
          ...this.state,
          tasks: fetchedTasks
        })
      })
  }


  onChangeEventHandler = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    })
    console.log(this.state);

  }


  onKeyDownHandler = (e) => {
    const tasks = {
      task: this.state.value
    }
    if (e.key === 'Enter') {
      if (this.state.tasks.length < 5) {

        this.setState({
          tasks: [...this.state.tasks,
          { task: this.state.value }],
          value: '',
        })

        axios.post('https://dashboard-list.firebaseio.com/tasks.json', tasks)
          .then(res => {
            console.log(res);


          })

      } else {
        alert("Max number of tasks is 5");
        this.setState({
          ...this.state,
          value: ''
        })
        return this.state
      }
    }
  }


  onAddHandler = () => {
    const tasks = {
      task: this.state.value
    }



    if (this.state.tasks.length < 5) {

      this.setState({
        tasks: [...this.state.tasks,
        { task: this.state.value }],
        value: '',
      })


      axios.post('https://dashboard-list.firebaseio.com/tasks.json', tasks)
        .then(res => {
          console.log(res);


        })


    } else {
      alert("Max number of tasks is 5");
      this.setState({
        ...this.state,
        value: ''
      })
      return this.state
    }


  }




  componentDidUpdate = () => {

    onDeleteHandler = (i) => {



      let lineToDelete = null;
      console.log(this.state.tasks);

      this.state.tasks.filter((el, index) => {
        console.log('i and index = ', i, index);
        console.log(el[i]);

        if (i === index) {

          // console.log(el);
          lineToDelete = el
        }
        return lineToDelete
      }
      )


      console.log('lineToDelete', lineToDelete.id);

      axios.delete('https://dashboard-list.firebaseio.com/tasks' + '/' + lineToDelete.id + '.json')




      this.setState({
        tasks: this.state.tasks.filter((el, index) => {
          return i !== index;
        })
      })

    }



  }





  render() {
    let output = null;

    if (this.state.tasks.length <= 5) {
      output =
        <div>
          <p>FORM</p>
          <p>Your input: {this.state.tasks.length}</p>
          {Object.keys(this.state.tasks).map((el, index) => {
            return (
              <p key={index}> {this.state.tasks[el].task} <button onClick={() => this.onDeleteHandler(index)}>DELETE</button></p>
            )
          })}
          <input
            type="text"
            onChange={this.onChangeEventHandler}
            onKeyDown={this.onKeyDownHandler}
            value={this.state.value}


          /><button onClick={() => this.onAddHandler()}>ADD</button>
        </div>



    } else {
      output = <div>

        alert()

      </div>

    }


    return (
      <div className="App">

        {output}

      </div>
    )
  }
}

export default App
