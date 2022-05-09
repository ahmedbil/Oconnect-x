# Configurable React Success Popup

## Screenshot with default settings

![alt screenshot](https://github.com/alexanderkrum/react-ui-library/blob/master/src/components/atoms/Confirmation/success-popup-small.png)

## Usage

```jsx
import SuccessPopup from 'react-success-popup'
;<SuccessPopup>Subscribed</SuccessPopup>
```

## Configuration

> All the CSS settings can be overridden. SVG animation accept only limited
> settings.

### Card settings

> its a div element so you can apply any settings you want.

The defaults:

```js
{
  transition: `opacity '300ms' ease-in`,
  opacity: opacity,
  position: 'absolute',
  left: '50vw',
  top: '50vh',
  transform: 'translate(-50%, -50%)',
  background: '#242424',
  borderRadius: '9px',
  width: '495px',
  height: '495px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}
```

Example apply red background color to the popup

```jsx
<SuccessPopUp theme={card:{
    backgroundColor: 'red'
}}>Subscribed</SuccessPopUp>
```

### Check SVG settings

> its an animated svg element. Only three settings will be applied to that
> element.

The defaults:

```js
{
  strokeColor: '#B0B0B0',
  strokeWidth: 20,
  duration: '0.5s'
}
```

Example apply 1s check animation

```jsx
<SuccessPopUp theme={check:{
    duration: '1s'
}}>Subscribed</SuccessPopUp>
```

### Text wrapper settings

> Its a div wrapper around the span text. You can override and extend any
> setting.

The defaults:

```js
textWrapper: {
   marginTop: '75px',
   marginLeft: '-20px',
}
```

Example move text closer to the check

```jsx
<SuccessPopUp theme={textWrapper:{
    marginTop: '25px'
}}>Subscribed</SuccessPopUp>
```

### Text settings

> Its a span text. You can override and extend any setting.

The defaults:

```js
text: {
   fontFamily: 'Roboto',
   fontStyle: 'normal',
   fontWeight: '500',
   fontSize: '45px',
   lineHeight: '53px',
   color: '#AEAEAE',
}
```

Example make text of a red color

```jsx
<SuccessPopUp theme={text:{
    color: 'red'
}}>Subscribed</SuccessPopUp>
```
