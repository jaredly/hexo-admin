
var React = require('react')
var writeGood = require('write-good')
var PT = React.PropTypes

var GrammarSuggestion = React.createClass({
  propTypes: {
    suggestion: PT.string
  },

  render: function () {
    var suggestion = this.props.suggestion.split('\n')
    var reason = suggestion.pop()
    var endStrong = reason.indexOf('" ') + 1
    reason = (<p className='grammar_reason'>
      <strong>{reason.substr(0, endStrong)}</strong>{reason.slice(endStrong)}
      </p>)

    return (<div className='grammar_box'>
      <pre className='grammar_suggestion'>
        {suggestion.join('\n')}
      </pre>
      {reason}
    </div>)
  }
})

var CheckGrammar = React.createClass({
  propTypes: {
    raw: PT.string
  },

  render: function () {
    var suggestions = writeGood.annotate(this.props.raw, writeGood(this.props.raw))
    var contents = [];
    if (suggestions.length === 0) {
      contents = GrammarSuggestion({
        suggestion: 'Nice! No grammar errors found!'
      })
    } else {
      suggestions.forEach(function (suggestion, i) {
        contents.push(GrammarSuggestion({suggestion, key: `suggestion-${i}`}))
      })
    }
    return (<div className='post-content editor_rendered'>
      {contents}
    </div>)
  }
})

module.exports = CheckGrammar
