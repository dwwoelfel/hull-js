/**
 * 
 * Create and edit quizzes.
 *
 * @name Quiz
 * @template {admin} The main template. It shows the list of your quizzes or the form to edit a quiz.
 * @template {list}  Show the list of your quizzes and a form to add new quizzes.
 * @template {form}  Show the form to edit a quiz.
 * @datasource {quizzes} The collection of all the quizzes available in the application.
 * @example <div data-hull-component="admin/quiz@hull"></div>
 */
Hull.define({

  type: "Hull",

  refreshEvents: ['model.hull.me.change'],

  datasources: {
    quizzes: function() {
      return this.api('app/achievements', {
        where: {
          _type: 'Quiz'
        }
      });
    }
  },

  templates: [
    'admin',
    'list',
    'form'
  ],

  beforeRender: function(data) {
    data.quiz = this.quiz;
    if(this.quiz) {
      data.quiz['json'] = JSON.stringify(this.quiz, null, 4);
    }
  },

  actions: {

    edit: function(e, params) {
      this.api(params.data.id, {}, function(data){
        this.quiz = data;
        this.render();
      }.bind(this));
      return false;
    },

    create: function(e) {
      e.preventDefault();
      var val = $('[data-hull-item="quiz-json"]').val().trim();
      try {
        var json = jQuery.parseJSON(val);
        this.api('app/achievements', 'post', json, function(data){
          this.quiz = data;
          this.render();
        }.bind(this));
      } catch(e) {
         alert('invalid json');
      }
    },

    delete: function(e) {
      if(window.confirm("Are you sure you want to delete this quiz?")) {
        this.api(this.quiz.id, 'delete', {}, function(){
          this.quiz = null;
          this.render();
        }.bind(this));
      }
      return false;
    },

    cancel: function() {
      this.quiz = null;
      this.render();
      return false;
    },

    submit: function(e) {
      // TODO
      e.preventDefault();
      var val = $('[data-hull-item="quiz-json"]').val().trim();
      try {
        var json = jQuery.parseJSON(val);
        this.api(json.id, 'put', json, function(data){
          this.quiz = null;
        this.render();
        }.bind(this));
      } catch(e) {
         alert('invalid json');
      }
    }
  }

});
