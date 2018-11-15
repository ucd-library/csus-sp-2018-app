// todo: create class representation of data to be posted to ldp

class ldp_post {

    constructor(options) {
        this._image_path = options.image_path;
        this._overall_height = options.overall_height;
        this._overall_width = options.overall_width;
        this._box_list = options.box_list;
    }

    get_box(id){
        for (box in this._box_list){
            if(box.box_id === id){
                return box;
            }
        }
    }

    delete_box(id){
       let box_list = this._box_list;

        for (let i = 0; i < box_list.length; i++){
            //Chenged box_list[i].id
            if(box_list[i] === id){
                box_list.splice(i, 1);
            }
        }
        return box_list; //added return

    }

    append_box(box){
        // do we have to pass box or id?
        //this._box_list = this._box_list.concat(box);
        return this._box_list.concat(box);
    }

    override_box(id, box){
        let box_list = this._box_list;

        for (let i = 0; i < box_list.length; i++){
            if(box_list[i].id === id){
                box_list[i] = box;
            }
        }
        return box_list; //added return without return it is undefined
    }
}

//Added This line for testing (Ehsan)
//Make sure it does not have conflict with others
module.exports = {
    class : ldp_post
};
