class PersonData{
    get id(){
        return this._id;
    }
    set id(id){
        this._id=id;
    }
    get name(){
        return this._name;
    }
    get mobile(){
        return this._mobile;
    }
    get address(){
        return this._address;
    }
    get state(){
        return this._state;
    }
    get city(){
        return this._city;
    }
    get pin(){
        return this._pin;
    }
    set name(name){
        this._name=name;
    }
    set mobile(mobile){
        this._mobile=mobile;
    }
    set address(address){
        this._address=address;
    }
    set state(state){
        this._state=state;
    }
    set city(city){
        this._city=city;
    }
    set pin(pin){
        this._pin=pin;
    }
    toString(){
        return 'name: ' + this._name + ', mobile:' + this._mobile + ', address: '+this._address+', state: '+this.state+
                ', city: '+ this._city +', pin: '+this._pin;
    }
}