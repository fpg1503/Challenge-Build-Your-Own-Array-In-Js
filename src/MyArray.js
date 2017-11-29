class MyArray {
    constructor(initialCapacity = 3) {
        this.elements = new PlainArray(initialCapacity)
        this.size = 0
    }

    //O(1)
    length() {
        return this.size
    }

    //O(n) :- O(1) if array has enough size left
    push(value) {
        if (this.size + 1 > this.elements.length) {
            const newArray = new PlainArray(Math.max(this.size * 2, 3))
            for (let i = 0; i < this.size; i++) {
                newArray.set(i, this.elements.get(i))
            }
            this.elements = newArray
        }
        this.elements.set(this.size, value)
        this.size += 1
    }

    //O(1)
    get(index) {
        if (index < 0 || index >= this.size) {
            return undefined
        }
        return this.elements.get(index)
    }

    //O(n) :- O(1) if array has enough size left
    set(index, value) {
        if (index > this.elements.length) {
            const newArray = new PlainArray(Math.max(index * 2, 3))
            for (let i = 0; i < this.size; i++) {
                newArray.set(i, this.elements.get(i))
            }
            this.elements = newArray
        }
        this.elements.set(index, value)
        this.size = Math.max(this.size, index + 1)
    }

    //O(n)
    static of(...items) {
        let array = new MyArray(items.length * 2)
        for (const item of items) {
            array.push(item)
        }
        return array
    }

    //O(1)
    pop() {
        if (this.size === 0) {
            return undefined
        }
        const popped = this.elements.get(this.size - 1)
        this.elements.set(this.size - 1, null)
        this.size -= 1
        return popped
    }

    //O(n+m)
    concat(other) {
        if (!other || other.size === 0) {
            return this
        }
        if (this.size === 0) {
            return other
        }
        const newSize = (this.size + other.size) * 2
        let shouldRewriteBeginning = true
        let newArray = (() => {
            if (this.elements.length >= newSize) {
                shouldRewriteBeginning = false
                return this
            } else if (other.elements.length >= newSize) {
                return other
            } else {
                return new MyArray(newSize)
            }
        })()
        if (shouldRewriteBeginning) {
            for (let i = 0; i < this.size; i++) {
                newArray.set(i, this.get(i))
            }
        }
        for (let i = 0; i < other.size; i++) {
            newArray.set(i + this.size, other.get(i))
        }
        return newArray
    }

    //O(n)
    indexOf(element) {
        for (let i = 0; i < this.size; i++) {
            if (this.get(i) === element) {
                return i
            }
        }
        return -1
    }

    //O(n)
    lastIndexOf(element) {
        for (let i = this.size - 1; i >= 0; i--) {
            if (this.get(i) === element) {
                return i
            }
        }
        return -1
    }

    //O(n)
    includes(element) {
        for (let i = 0; i < this.size; i++) {
            if (this.get(i) === element) {
                return true
            }
        }
        return false
    }

    //O(fn(n))
    find(fn) {
        for (let i = 0; i < this.size; i++) {
            const element = this.get(i)
            if (fn(element)) {
                return element
            }
        }
        return undefined
    }

    //O(fn(n))
    findIndex(fn) {
        for (let i = 0; i < this.size; i++) {
            if (fn(this.get(i))) {
                return i
            }
        }
        return -1
    }

    //O(n)
    equals(other) {
        if (this.size != other.size) {
            return false
        }
        for (let i = 0; i < this.size; i++) {
            if (this.get(i) !== other.get(i)) {
                return false
            }
        }
        return true
    }

    //O(fn(n))
    forEach(fn) {
        for (let i = 0; i < this.size; i++) {
            fn(this.get(i), i)
        }
    }

    //O(n)
    join(separator = ',') {
        let accumulator = ''
        for (let i = 0; i < this.size; i++) {
            accumulator += this.get(i)
            if (i < this.size - 1) {
                accumulator += separator
            }
        }
        return accumulator
    }

    //O(n)
    toString() {
        return this.join()
    }

    //O(fn(n))
    map(fn) {
        const newArray = new MyArray(this.size * 2)
        for (let i = 0; i < this.size; i++) {
            newArray.set(i, fn(this.get(i)))
        }
        return newArray
    }

    //O(fn(n))
    filter(fn) {
        const newArray = new MyArray(this.size * 2)
        for (let i = 0; i < this.size; i++) {
            const element = this.get(i)
            if (fn(element)) {
                newArray.push(element)
            }
        }
        return newArray
    }

    //O(fn(n))
    some(fn) {
        for (let i = 0; i < this.size; i++) {
            const element = this.get(i)
            if (fn(element)) {
                return true
            }
        }
        return false
    }

    //O(fn(n))
    every(fn) {
        for (let i = 0; i < this.size; i++) {
            const element = this.get(i)
            if (!fn(element)) {
                return false
            }
        }
        return true
    }

    //O(n)
    fill(value, start = 0, end = this.size) {
        for (let i = start; i < end; i++) {
            this.set(i, value)
        }
    }

    //O(n)
    reverse() {
        for (let i = 0; i < this.size / 2; i++) {
            const complementIndex = this.size - i - 1
            const temp = this.get(i)
            this.set(i, this.get(complementIndex))
            this.set(complementIndex, temp)
        }
    }

    //O(n)
    shift() {
        if (this.size == 0) {
            return undefined
        }
        const shifted = this.get(0)
        for (let i = 0; i < this.size - 1; i++) {
            this.set(i, this.get(i + 1))
        }
        this.size -= 1
        return shifted
    }

    //O(n)
    unshift(element) {
        for (let i = this.size; i > 0; i--) {
            this.set(i, this.get(i - 1))
        }
        this.set(0, element)
    }

    //O(n)
    slice(start = 0, end = this.size) {
        const newSize = (end - start) * 2
        let newArray = new MyArray(newSize)
        for (let i = 0; i < end - start; i++) {
            newArray.set(i, this.get(start + i))
        }
        return newArray
    }

    //O(n)
    splice(start, deleteCount = this.size - start, ...newItems) {
        const insertCount = newItems.length || 0
        this.size += insertCount - deleteCount
        const shouldCreateNew = this.elements.length < this.size
        let array = shouldCreateNew ? new PlainArray(this.size * 2) : this.elements
        if (insertCount <= deleteCount) {
            //Unshift
            for (let i = start + insertCount; i < this.size; i++) {
                array.set(i, this.elements.get(i - insertCount + deleteCount))
            }
        }
        else {
            if (shouldCreateNew) {
                //Copy first items
                for (let i = 0; i < start; i++) {
                    array.set(i, this.elements.get(i))
                }
            }
            else {
                //Shift
                for (let i = this.size - 1; i >= start + insertCount; i--) {
                    array.set(i, this.elements.get(i - (insertCount - deleteCount)))
                }
                this.elements = array
            }
        }
        //Insert new items
        for (let i = start; i < start + insertCount; i++) {
            array.set(i, newItems[i - start])
        }
    }
}
