var p = require('es6-promise')
  , Promise = p.Promise

module.exports = function (fetch) {
  return {
    getInitialState: function () {
      return { }
    },

    componentWillMount: function () {
      this.loadData(this.props)
    },

    componentWillReceiveProps: function (nextProps) {
      this.loadData(nextProps)
    },

    loadData: function (props) {
      var items = fetch(props.params)
      Object.keys(items).forEach((name) => {
        Promise.resolve(items[name]).then((data) => {
          if (!this.isMounted()) return
          var update = {}
          update[name] = data
          this.setState(update)
          if (this.dataDidLoad) {
            this.dataDidLoad(name, data)
          }
        })
      })
    }
  }
}

