function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    return this.size
};

MyArray.prototype.push = function (value) {
    if (this.size + 1 > this.elements.length) {
        const newArray = new PlainArray(Math.max(this.size * 2, 3))  
        for (let i = 0; i < this.size; i++) {
            newArray.set(i, this.elements.get(i))
        }
        this.elements = newArray
    }
    this.elements.set(this.size, value)
    this.size += 1
};

MyArray.prototype.get = function (index) {
    if (index < 0 || index >= this.size) {
        return undefined
    }
    return this.elements.get(index)
};

MyArray.prototype.set = function (index, value) {
    if (index > this.elements.length) {
        const newArray = new PlainArray(Math.max(index * 2, 3))  
        for (let i = 0; i < this.size; i++) {
            newArray.set(i, this.elements.get(i))
        }
        this.elements = newArray
    }
    this.elements.set(index, value)
    this.size = Math.max(this.size, index + 1)
};

MyArray.of = function () {
    let array = new MyArray(arguments.length * 2)
    for (argument of arguments) {
        array.push(argument)
    }
    return array
};

MyArray.prototype.pop = function () {
    if (this.size === 0) {
        return undefined
    }

    const popped = this.elements.get(this.size - 1)
    this.elements.set(this.size - 1, null)
    this.size -= 1

    return popped
};

MyArray.prototype.concat = function (other) {
    if (!other || other.size === 0) {
        return this
    }

    if (this.size === 0) {
        return other
    }

    const newSize = (this.size + other.size) * 2

    let newArray = new MyArray(newSize)

    for (let i = 0; i < this.size; i++) {
        newArray.set(i, this.get(i))
    }

    for (let i = 0; i < other.size; i++) {
        newArray.set(i + this.size, other.get(i))
    }

    return newArray
};

MyArray.prototype.indexOf = function (element) {
    for (let i = 0; i < this.size; i++) {
        if (this.get(i) === element) {
            return i
        }
    }

    return -1
};

MyArray.prototype.lastIndexOf = function (element) {
    for (let i = this.size - 1; i >= 0; i--) {
        if (this.get(i) === element) {
            return i
        }
    }

    return -1
};

MyArray.prototype.includes = function (element) {
    for (let i = 0; i < this.size; i++) {        
        if (this.get(i) === element) {
            return true
        }
    }

    return false
};

MyArray.prototype.find = function (fn) {
    for (let i = 0; i < this.size; i++) {
        const element = this.get(i)
        if (fn(element)) {
            return element
        }
    }

    return undefined
};

MyArray.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.size; i++) {
        if (fn(this.get(i))) {
            return i
        }
    }

    return -1
};

MyArray.prototype.equals = function (other) {
    if (this.size != other.size) {
        return false
    }
    
    for (let i = 0; i < this.size; i++) {
        if (this.get(i) !== other.get(i)) {
            return false
        }
    }

    return true
};

MyArray.prototype.forEach = function (fn) {
    for (let i = 0; i < this.size; i++) {
        fn(this.get(i), i)
    }
};

MyArray.prototype.join = function (separator) {
    if (separator === undefined) {
        separator = ','
    }

    let accumulator = ''
    for (let i = 0; i < this.size; i++) {
        accumulator += this.get(i)

        if (i < this.size - 1) {
            accumulator += separator
        }
    }

    return accumulator
};

MyArray.prototype.toString = function () {
    return this.join()
};

MyArray.prototype.map = function (fn) {
    const newArray = new MyArray(this.size * 2)
    for (let i = 0; i < this.size; i++) {
        newArray.set(i, fn(this.get(i)))
    }

    return newArray
};

MyArray.prototype.filter = function (fn) {
    const newArray = new MyArray(this.size * 2)
    for (let i = 0; i < this.size; i++) {
        const element = this.get(i)
        if (fn(element)) {
            newArray.push(element)
        }
    }

    return newArray
};

MyArray.prototype.some = function (fn) {
    for (let i = 0; i < this.size; i++) {
        const element = this.get(i)
        if (fn(element)) {
            return true
        }
    }

    return false
};

MyArray.prototype.every = function (fn) {
    for (let i = 0; i < this.size; i++) {
        const element = this.get(i)
        if (!fn(element)) {
            return false
        }
    }

    return true
};

MyArray.prototype.fill = function (value, start, end) {
    if (start === undefined) {
        start = 0
    }

    if (end === undefined) {
        end = this.size
    }

    for (let i = start; i < end; i++) {
        this.set(i, value)
    }
};

MyArray.prototype.reverse = function () {
    for (let i = 0; i < this.size/2; i++) {
        const complementIndex = this.size - i - 1
        const temp = this.get(i)
        this.set(i, this.get(complementIndex))
        this.set(complementIndex, temp)
    }
};

MyArray.prototype.shift = function () {
    if (this.size == 0) {
        return undefined
    }

    const shifted = this.get(0)
    for (let i = 0; i < this.size - 1; i++) {
        this.set(i, this.get(i + 1))
    }

    this.size -= 1

    return shifted
};

MyArray.prototype.unshift = function (element) {
    for (let i = this.size; i > 0; i--) {
        this.set(i, this.get(i - 1))
    }

    this.set(0, element)
};

MyArray.prototype.slice = function (start, end) {
    if (start === undefined) {
        start = 0
    }

    if (end === undefined) {
        end = this.size
    }

    const newSize = (end - start) * 2
    let newArray = new MyArray(newSize)
    for (let i = 0; i < end - start; i++) {
        newArray.set(i, this.get(start + i))
    }

    return newArray
};

MyArray.prototype.splice = function (start, deleteCount) {
    console.log(`called, arguments: [${Array.from(arguments)}]`)
    if (start >= this.size) {
        return
    }

    if (deleteCount === undefined) {
        deleteCount = this.size - start
    }

    const insertCount = Math.max(0, arguments.length - 2)
    this.size += insertCount - deleteCount 
    
    if (insertCount <= deleteCount) {
        //Unshift
        for (let i = start + insertCount; i < this.size; i++) {
            this.elements.set(i, this.elements.get(i - insertCount + deleteCount))
        }
        //Insert
        for (let i = start; i < start + insertCount; i++) {
            this.elements.set(i, arguments[i - start + 2])
        }
    } else {
        if (this.elements.length >= this.size) {
            //Shift
            for (let i = this.size - 1; i >= start + insertCount; i--) {
                this.elements.set(i, this.elements.get(i - (insertCount - deleteCount)))
            }
            //Insert new items
            for (let i = start; i < start + insertCount; i++) {
                this.elements.set(i, arguments[i - start + 2])
            }
        } else {
            let newArray = new PlainArray(this.size * 2)
            //Copy first items
            for (let i = 0; i < start; i++) {
                newArray.set(i, this.elements.get(i))
            }
            //Insert new items
            for (let i = start; i < start + insertCount; i++) {
                newArray.set(i, arguments[i - start + 2])
            }
            //Shift
            for (let i = start + insertCount; i < this.size; i++) {
                newArray.set(i, this.elements.get(i - (insertCount - deleteCount)))
            }
            this.elements = newArray
        }
    }
};