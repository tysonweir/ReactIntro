var React = require('react');
var Router = require('react-router');
var Repos = require('./GitHub/Repos');
var UserProfile = require('./GitHub/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require ('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio: {
        name: 'Tyson Hughes'
      },
      repos: ['a', 'b', 'c']
    }
  },

  componentDidMount: function(){
    this.ref = new Firebase('https://notetaker-th-test.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes');
  },

  handleAddNote: function(newNote){
      this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },

  componentWillUnmount: function(){
    this.unbind('notes');
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes
            username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNote} />
        </div>
      </div>
    )
  }
})

module.exports = Profile;
