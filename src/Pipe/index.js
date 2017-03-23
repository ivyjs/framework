class Pipe {
    constructor(sharedData) {
        this.sharedData = sharedData || {};
    }

    /**
     * Data to pipe through.
     *
     * @param sharedData
     * @return {Pipe}
     */
    static data(sharedData) {
        return new Pipe(sharedData);
    }

    /**
     * List to go through.
     *
     * @param throughList
     * @return {Pipe}
     */
    through(throughList) {
        this.throughList = throughList.reverse();
        return this;
    }

    /**
     * Next handler.
     *
     * @param err
     * @return {*}
     */
    next(err) {
        if (err)
            return this.errorHandler(err);
        if (this.throughList.length > 0) {
            let currentlyExecuting = this.throughList.pop();
            return currentlyExecuting(this.sharedData, (err) => { this.next(err); });
        }
        else
            return this.thenHandler(this.sharedData);
    }

    /**
     * Then do...
     *
     * @param thenHandler
     */
    then(thenHandler) {
        this.thenHandler = thenHandler;
        this.next();
    }

    /**
     * Catch the error.
     *
     * @param errorHandler
     * @return {Pipe}
     */
    catch(errorHandler) {
        this.errorHandler = errorHandler;
        return this;
    }
}
module.exports = Pipe;