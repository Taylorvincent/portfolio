/**
 *
 * BlinkText
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

class BlinkText extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      renderText: true,
      renderButtons: false,
      text: {},
      buttons: {},
      isTextFinished: false,
      closeDialog_counter: 0,
    }
  }

  // dit zou eigenlijk jsx als content moeten nemen ipv zelf verzonnen object

  renderBlinkingText(content, output_parent, tag_i, text_i, delay){
    if (tag_i < content.length && !this.state.isTextFinished) {
      if (text_i < content[tag_i].length) {
        this.setState( prevstate => {
          let newText = prevstate[output_parent][tag_i] ? prevstate[output_parent][tag_i] + content[tag_i][text_i] : content[tag_i][text_i]
          return {
            ...prevstate,
            [output_parent]: {
              ...prevstate[output_parent],
              [tag_i] : newText
            },
          }
        }, () => {
          text_i+=1
          let multiplier;
          switch (content[tag_i][text_i-1]) {
            case ",":
            case ".":
              multiplier = 10;
              break;
            case "?":
              multiplier = 15;
              break;
            default:
              multiplier = 1
              break;
          }
          if (this.state.isTextFinished) {
            delay = multiplier = 1
          }
          return setTimeout( () => this.renderBlinkingText(content, output_parent, tag_i, text_i, delay), delay * multiplier);
        })
      } else {
        text_i = 0
        tag_i += 1
        return setTimeout( () => this.renderBlinkingText(content, output_parent, tag_i, text_i, delay), delay);
      }
    } else{
      return this.setState({isTextFinished: true});
    }
  }

  renderFinishedText(content, output_parent){
    for (let i = 0; i < content.length; i++) {
      const text_el = content[i];
      this.setState(prevstate => {
        return {
          ...prevstate,
          [output_parent]: {
            ...prevstate[output_parent],
            [i] : text_el
          }
        }
      })
    }
  }

  componentDidMount(){
    if (this.props.content.text) {
      setTimeout(() => {
        this.renderBlinkingText(this.props.content.text, "text", 0, 0, 70)
      }, 500);
    }
  }

  renderTextObject(object){
    for (let i = 0; i < Object.keys(object).length; i++) {
      const key = Object.keys(object)[i];
      return <p key={i}> {object[key]} </p>
    }
  }

  closeDialogHandler(e){
    e.preventDefault()
    this.setState( prevstate => {
      return { closeDialog_counter: prevstate.closeDialog_counter + 1 }
    }, () => {
      if (this.state.closeDialog_counter < 2 && !this.state.isTextFinished) {
        this.setState({
          isTextFinished: true
        })
      }
      else {
        this.props.closeDialog()
      }
    })
    // increment counter
    // if text is not finished, finish text
    // else if text is finished
    // this.props.closeDialog
  }

  render() {
    let renderText
    this.state.isTextFinished ? renderText = this.props.content.text : renderText = this.state.text

    return (
      <div id="dialog-content">
        <a href="#" className="close-dialog" onClick={(e) => this.closeDialogHandler(e)}></a>
        <div className="p-container">
          {
            Object.keys(renderText).map((key,index) =>{
              let cursor;
              if (index == Object.keys(renderText).length-1) {
                cursor = <i key={index} className="blinking-cursor">_</i>
              }
              return <p key={key+renderText[index].length}>
                {renderText[index]}
                {cursor}
              </p>
            })
          }
        </div>
        <div>
          {(this.props.content.buttons && this.state.isTextFinished) &&
            Object.keys(this.props.content.buttons).map((key,index) =>{
              let btn = this.props.content.buttons[index];
              return <a key={key} onClick={btn.onClick ? (e) => this.closeDialogHandler(e) : null} href={btn.href}>{btn.text}</a>
            })
          }
        </div>
      </div>
    );
  }
}

BlinkText.propTypes = {};

export default BlinkText;
