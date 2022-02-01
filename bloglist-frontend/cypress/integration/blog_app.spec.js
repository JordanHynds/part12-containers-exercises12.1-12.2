describe('PhoneBook app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: "testingusername",
            password: "password",
            name: "testingname",
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get("#loginTitle")
        cy.get("#usernameInput")
        cy.get("#passwordInput")
        cy.get("#loginSubmit")

    })

    describe('Login', function () {
        it('fails with wrong credentials', function () {
            cy.get("#usernameInput").type("wrongusername")
            cy.get("#passwordInput").type("password")
            cy.get("#loginSubmit").click()
            cy.get("#errorMessage").contains("Wrong credentials")
        })
        it('succeeds with correct credentials', function () {
            cy.get("#usernameInput").type("testingusername")
            cy.get("#passwordInput").type("password")
            cy.get("#loginSubmit").click()
        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'testingusername', password: 'password'
            }).then(response => {
                localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function () {
            cy.get("#CreateNewBlog").click()
            cy.get("#Title").type("testTitle")
            cy.get("#Author").type("testAuthor")
            cy.get("#Url").type("testUrl")
            cy.get("#SubmitButton").click()

            cy.get("#ListofBlogs").children().should('have.length', 1)
            cy.get("#testTitle").children().get(".default").get("#view").click()
            cy.get("#testTitle").children().get(".shown").as("addedblog")
            cy.get("@addedblog").contains("testTitle testAuthor")
            cy.get("@addedblog").contains("testUrl")
            cy.get("@addedblog").contains("likes")
            cy.get("@addedblog").contains("testingusername")

        })

        it('Like a Blog', function () {
            cy.request({
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: "testTitle", author: "testAuthor", url: "testUrl" },
                headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}` }
            })
            cy.get("#testTitle").children().get(".default").get("#view").click()
            cy.get("#testTitle").children().get(".shown").as("addedblog")
            cy.get("@addedblog").get("#like").get('#likeButton').click()
            cy.get("@addedblog").get("#like").contains("likes 1")
        })

        it('Delete a Blog', function () {
            cy.request({
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: "testTitle", author: "testAuthor", url: "testUrl" },
                headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}` }
            })
            cy.get("#testTitle").children().get(".default").get("#view").click()
            cy.get("#testTitle").children().get(".shown").get("#remove").click()
            cy.get("#ListofBlogs").children().should('have.length', 0)
        })

        it('checkSortedBlogs', function () {
            cy.request({
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: "testTitle", author: "testAuthor", url: "testUrl" },
                headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}` }
            })
            cy.request({
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: "testTitle2", author: "testAuthor2", url: "testUrl2" },
                headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}` }
            })
            cy.reload()
            cy.get("#ListofBlogs").get("#testTitle").children(".default").children("#view").click()
            cy.get("#ListofBlogs").get("#testTitle2").children(".default").children("#view").click()
            cy.get("#ListofBlogs").get("#testTitle").children(".shown").children("#like").children("#likeButton").as("testTitlelikeButton")
            cy.get("@testTitlelikeButton").click()
            cy.wait(2000)
            cy.get("#ListofBlogs").get("#testTitle").children(".shown").children("#like").children("#likeButton").click()
            cy.get("#ListofBlogs").get("#testTitle2").children(".shown").children("#like").children("#likeButton").click()

            cy.get("#ListofBlogs").children().then(($ListofBlogs) => {
                ($ListofBlogs).map((i, el) => {
                    cy.get(el).children('.shown').children("#like").children("#numberofLikes").should('have.text', `likes ${i + 1} `)
                })


            })

        })

    })

})


