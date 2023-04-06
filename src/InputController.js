import Controller from './Controller';

export default class InputController extends Controller {

	constructor( parent, object, property, type, attrs ) {
		super( parent, object, property, type );
		this.inputType = type;
		switch(type) {
			case "textarea":{
				this.$input = document.createElement( 'textarea' );
				this.$input.addEventListener( 'input', () => {
					this.setValue( this.$input.value );
				} );
				this.$input.addEventListener( 'keydown', e => {
					if ( e.code === 'Enter' ) {
						this.$input.blur();
					}
				} );
				this.$input.addEventListener( 'blur', () => {
					this._callOnFinishChange();
				} );
				break;
			}
			case "file":{
				this.$input = document.createElement( 'input' );
				this.$input.setAttribute( 'type', 'file' );
				this.$input.addEventListener( 'change', () => {
					this.setValue( this.$input.files );
					this._callOnFinishChange();
				} );
				break;
			}
			default:{
				this.$input = document.createElement( 'input' );
				this.$input.setAttribute( 'type', type );
				this.$input.setAttribute( 'aria-labelledby', this.$name.id );
		
				this.$input.addEventListener( 'input', () => {
					this.setValue( this.$input.value );
				} );
		
				this.$input.addEventListener( 'keydown', e => {
					if ( e.code === 'Enter' ) {
						this.$input.blur();
					}
				} );
		
				this.$input.addEventListener( 'blur', () => {
					this._callOnFinishChange();
				} );
				break;
			}
		}
		if(attrs) {
			for(var key in attrs) {
				var value = attrs[key];
				this.$input.setAttribute(key, value);
			}
		}
		this.$input.classList.add( type );
		this.$widget.appendChild( this.$input );

		this.$disable = this.$input;

		this.updateDisplay();
	}

	updateDisplay() {
		switch(this.inputType) {
			case "textarea":{
				this.$input.value = this.getValue();
				break;
			}
		}
		return this;
	}

}
