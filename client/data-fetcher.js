var Promise = require('es6-promise').Promise

/**
 * Take an object and serialize it into a string for key lookup.
 *
 * Currently returns a jsonified list of [k1, v1, k2, v2, ...] with the keys
 * sorted.
 *
 * @param {object} obj
 * @return {string} the serialized form
 */
function serialize(obj) {
  if (!obj) return ''
  var keys = Object.keys(obj);
  keys.sort();
  var data = [];
  keys.map((key) => data = data.concat([key, obj[key]]))
  return JSON.stringify(data)
}

module.exports = function (options) {
  var cache = {}
  if (!options.fetch) {
    throw new Error("fetch parameter required for DataFetcher");
  }
  var getFetchParams = options.getFetchParams || ((params, query) => {
    return params
  })
  return {

    getDefaultProps: function () {
      return {
        initialData: null
      }
    },

    getInitialState: function () {
      return {
        data: this.props.initialData,
        dataLoading: true,
        dataFailed: false
      }
    },

    componentWillMount: function () {
      if (!this.state.data) this.loadData(this.props)
    },

    componentWillReceiveProps: function (nextProps) {
      this.loadData(nextProps)
    },

    refreshData: function () {
      this.loadData(this.props, true)
    },

    loadData: function (props, force) {
      var params = getFetchParams(props.params, props.query)
      var key = serialize(params)

      var loading;
      if (cache[key] && !force) {
        var data = cache[key]
        loading = Promise.resolve(data)
      } else {
        loading = options.fetch(params)
      }

      loading.then((data) => {
        if (!this.isMounted()) return
        cache[key] = data
        this.setState({
          data: data,
          dataLoading: false,
          dataFailed: false
        }, () => {
          if (this.dataDidLoad) {
            this.dataDidLoad(data)
          }
        })
      }, (err) => {
        if (!this.isMounted()) return
        this.setState({
          dataLoading: false,
          dataFailed: err
        })
      });
    }
  }
}

