/*
 * Copyright 2012 buddycloud
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require) {
  var Backbone = require('backbone');
  var Events = Backbone.Events;
  var EditChannelView = require('views/content/EditChannelView');

  var EditChannelPage = Backbone.View.extend({
    className: 'channelView',

    initialize: function() {
      if (this._isOwner()) {
        this.model = this.options.user.metadata(this.options.channel);
        this.view = new EditChannelView({
          model: this.model,
          user: this.options.user
        });
        this.render();
      } else {
        Events.trigger('forbidden');
      }
    },

    _isOwner: function() {
      var channel = this.options.channel;
      return this.options.user.subscribedChannels.isOwner(channel);
    },

    render: function() {
      var $content = $('.content');
      $content.html(this.view.el);
      $content.removeClass('full');
    },

    destroy: function() {
      if (this.view && this.model) {
        this.model.unbind('change', this.render, this);
        this.view.destroy();
        this.remove();
      }
    }
  });

  return EditChannelPage;
});
