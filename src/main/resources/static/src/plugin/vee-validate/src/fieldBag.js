export default class FieldBag {
    constructor($vm) {
        this.fields = {};
        this.$vm = $vm;
    }

    /**
     * Initializes and adds a new field to the bag.
     */
    _add(name) {
        this.fields[name] = {};
        /* istanbul ignore if */
        if (this.$vm && typeof this.$vm.$set === 'function') {
            this.$vm.$set(`fields.${name}`, {});
        }
        this._setFlags(name, { dirty: false, valid: false }, true);
    }

    /**
     * Resets the flags for a specific field.
     */
    reset(name) {
        if (! name) {
            Object.keys(this.fields).forEach(field => {
                this._setFlags(field, { dirty: false, valid: false }, true);
            });

            return;
        }
        this._setFlags(name, { dirty: false, valid: false }, true);
    }

    /**
     * Removes a field from the bag.
     */
    _remove(name) {
        delete this.fields[name];
    }

    /**
     * Sets the flags for a specified field.
     */
    _setFlags(name, flags, initial = false) {
        const success = Object.keys(flags).every(
            flag => this._setFlag(name, flag, flags[flag], initial)
        );

        /* istanbul ignore if */
        if (success && this.$vm && typeof this.$vm.$set === 'function') {
            this.$vm.$set(`fields.${name}`, this.fields[name]);
        }

        return success;
    }

    /**
     * Sets a flag for a specified field.
     */
    _setFlag(name, flag, value, initial = false) {
        const method = `set${flag.charAt(0).toUpperCase()}${flag.slice(1)}`;
        if (typeof this[method] !== 'function') {
            return false;
        }

        this[method](name, value, initial);

        return true;
    }

    /**
     * Updates the dirty flag for a specified field with its dependant flags.
     */
    setDirty(name, value, initial = false) {
        this.fields[name].dirty = value;
        this.fields[name].clean = initial || ! value;
        this.fields[name].passed = this.fields[name].valid && value;
        this.fields[name].failed = ! this.fields[name].valid && value;
    }

    /**
     * Updates the valid flag for a specified field with its dependant flags.
     */
    setValid(name, value) {
        this.fields[name].valid = value;
        this.fields[name].passed = this.fields[name].dirty && value;
        this.fields[name].failed = this.fields[name].dirty && ! value;
    }

    /**
     * Gets a flag.
     */
    _getFieldFlag(name, flag) {
        if (this.fields[name]) {
            return this.fields[name][flag];
        }

        return false;
    }

    dirty(name) {
        if (! name) {
            return Object.keys(this.fields).some(field => this.fields[field].dirty);
        }

        return this._getFieldFlag(name, 'dirty');
    }

    valid(name) {
        if (! name) {
            return Object.keys(this.fields).every(field => this.fields[field].valid);
        }

        return this._getFieldFlag(name, 'valid');
    }

    passed(name) {
        if (! name) {
            return Object.keys(this.fields).every(field => this.fields[field].passed);
        }

        return this._getFieldFlag(name, 'passed');
    }

    failed(name) {
        if (! name) {
            return Object.keys(this.fields).some(field => this.fields[field].failed);
        }

        return this._getFieldFlag(name, 'failed');
    }

    clean(name) {
        if (! name) {
            return ! this.dirty();
        }

        return this._getFieldFlag(name, 'clean');
    }
}
