class Ingredients {
    constructor(itemPerRow) {
        this._itemPerRow = itemPerRow;
        this._currentItemCount = 0;
    }

    get itemPerRow() {
        return this._itemPerRow;
    }

    set itemPerRow(value) {
        this._itemPerRow = value;
    }

    get currentItemCount() {
        return this._currentItemCount;
    }

    set currentItemCount(value) {
        this._currentItemCount = value;
    }

    get currentRowCount() {
        return this._currentItemCount / this._itemPerRow;
    }

    decRow() {
        this._currentItemCount -= this._itemPerRow;
    }
}

export default Ingredients;