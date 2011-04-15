MemoryPubSub = module.exports = function() {
    this.subscriptions = {};
}

//TODO: this.subscriptions[channel] = Array
MemoryPubSub.prototype.subscribe = function(channel, callback) {
    this.subscriptions[channel] = callback;
}

MemoryPubSub.prototype.unsubscribe = function(channel) {
    delete this.subscriptions[channel];
}

MemoryPubSub.prototype.publish = function(channel, message) {
    var self = this;

    var subscription = this.subscriptions[channel];
    if (subscription) {
        process.nextTick(function() {
            subscription(message);
        });
    }
}