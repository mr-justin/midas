define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var CommentModel = Backbone.Model.extend({

    defaults: { 
      projectId : null,
      parentId  : null,
      taskId    : null,
      value     : null
    },

    urlRoot: '/comment',

    initialize: function () {
      this.initializeCommentSave();
    },

    initializeCommentSave: function () {
      var _this = this;

      this.on("comment:save", function (comment, projectId) {
        // Comment content is saved in the DB as 'value' 
        // on the Comment table.
        _this.save({ 
          value     : comment,
          projectId : projectId
          }, { 
          success: function (data) { 
            app.events.trigger("commentSave:success");
          }, 
          error: function (data) { 
            console.log(data) 
          }
        });
      });
    }
  });

    return CommentModel;
});