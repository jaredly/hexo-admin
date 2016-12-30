
var React = require('react')
var writeGood = require('write-good')
var PT = React.PropTypes

// component for individual grammar suggestion
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
      {suggestion && <pre className='grammar_suggestion'>
        {suggestion.join('\n')}
      </pre>}
      {reason}
    </div>)
  }
})

// builds array of GrammarSuggestion components from writeGood suggestions
var suggestionContents = function (suggestions) {
  var contents = [];
  if (suggestions.length === 0) {
    var golden = {color: 'gold'};
    contents = (<div className='grammar_box'>
      <p className='grammar_reason'><i style={golden} className="fa fa-star"></i>&nbsp;Nice! No possible improvements were found!</p>
    </div>)
  } else {
    suggestions.forEach(function (suggestion, i) {
      contents.push(GrammarSuggestion({suggestion, key: `suggestion-${i}`}))
    })
  }
  return contents
}

// takes the place of Rendered in the editor, showing grammar suggestions
var CheckGrammar = React.createClass({
  propTypes: {
    raw: PT.string
  },

  getInitialState: function () {
    return {
      suggestions: [],
    };
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.raw !== this.props.raw) {
      var suggestions = writeGood.annotate(this.props.raw, writeGood(this.props.raw))
      this.setState({suggestions: suggestionContents(suggestions)})
    }
  },

  componentDidMount: function () {
    var suggestions = writeGood.annotate(this.props.raw, writeGood(this.props.raw))
    this.setState({suggestions: suggestionContents(suggestions)})
  },

  render: function () {
    return (<div className='post-content editor_rendered'>
      <h2>Writing Suggestions</h2>
      {this.state.suggestions}
    </div>)
  }
})

module.exports = CheckGrammar
