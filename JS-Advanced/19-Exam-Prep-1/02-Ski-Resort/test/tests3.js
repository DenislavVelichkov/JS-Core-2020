describe('SkiResort', function () {
    let skiResort;
    // rN === Resort name
    let rN = 'Resort Name'
    beforeEach(function () {
        skiResort = new SkiResort(rN)
    })

    let stringifyCompare = (a, b) => assert.deepEqual(JSON.stringify(a), JSON.stringify(b))

    describe('Instantiation with one parameter ', function () {
        it('When created with string should have name , empty hotels and voters', function () {
            assert.deepEqual(skiResort.name, rN);
            assert.deepEqual(skiResort.voters, 0);
            stringifyCompare(skiResort.hotels, []);
        })
    })

    describe('bestHotel method', function () {
        it('no voters case', function () {
            assert.deepEqual(skiResort.bestHotel, 'No votes yet');
        }),
            it('voters case', function () {

                skiResort.build('Name', 10)
                skiResort.leave('Name', 10, 10)
                skiResort.build('Name2', 10)
                skiResort.leave('Name2', 10, 20)
                // TODO Retrun here after we find out what this method does
                // let best = skiResort.hotels.reduce((a, b) => a.points > b.points ? a : b);
                assert.deepEqual(skiResort.bestHotel, `Best hotel is Name2 with grade 200. Available beds: 20`)
            })
    })

    describe('Build hotel', function () {
        it('should throw if there is no name', function () {
            // assert.throws(() => { skiResort.build() });
            assert.throws(() => { skiResort.build('', 2) });
        })
        it('should throw if the beds are less than 1 or none', function () {
            assert.throws(() => { skiResort.build('', 0) });
            assert.throws(() => { skiResort.build('') });
        })
        it('It should add a hotel to the hotel array', function () {
            assert.deepEqual(skiResort.build('New Hotel', 10), `Successfully built new hotel - New Hotel`)
            stringifyCompare(skiResort.hotels, [{
                name: 'New Hotel',
                beds: 10,
                points: 0
            }])
        })
    })

    describe('Test booking', function () {
        it('Should throw error if wrong input', function () {

            assert.throws(() => { skiResort.book() })
            assert.throws(() => { skiResort.book('', 1) })
            assert.throws(() => { skiResort.book('Name', 0) })
        })

        it('Should throw  if there is no hotel with such name', function () {
            assert.throws(() => { skiResort.book('Name', 5) })
        })
        it('Should throw  if there is no hotel with such name', function () {
            skiResort.build('Name', 10)
            assert.throws(() => { skiResort.book('Name', 11) })
        })
        it('Should throw  if there is no hotel with such name', function () {
            skiResort.build('Name', 10)
            assert.deepEqual(skiResort.book('Name', 10), 'Successfully booked')
        })
        it('Should throw  the beds are not decremented in the hotel', function () {
            skiResort.build('Name', 10)
            skiResort.book('Name', 10)
            stringifyCompare(skiResort.hotels, [{ name: 'Name', beds: 0, points: 0 }])
        })
    })

    describe('Test leave func', function () {
        it('should throw with wrong params', function () {
            assert.throws(() => skiResort.leave('', 10, 10))
            assert.throws(() => skiResort.leave('Name', 0, 10))
            assert.throws(() => skiResort.leave('Name', 20, 10))
        })
        it('should return success message', function () {
            skiResort.build('Name', 10)
            assert.deepEqual(skiResort.leave('Name', 10, 10), `10 people left Name hotel`)
        })
        it('should increment hotel score', function () {
            skiResort.build('Name', 10)
            skiResort.leave('Name', 10, 10)
            stringifyCompare(skiResort.hotels, [{ name: 'Name', beds: 20, points: 100 }])
        })
    })

    describe('it should return the avg grade', function () {
        it('should return when no voters', function () {
            assert.deepEqual(skiResort.averageGrade(), 'No votes yet')
        })
        it('should return the average score', function () {
            skiResort.build('Name', 10)
            skiResort.leave('Name', 10, 10)
            assert.deepEqual(skiResort.averageGrade(), `Average grade: ${(10).toFixed(2)}`)
        })
    })
});