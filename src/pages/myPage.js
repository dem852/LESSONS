class visioArticle {
    page
    constructor(page) {
        this.page = page;
    }

    visualButton() {
        return this.page.getByRole('button', { name: ' Edit Article' }).first();
    }
}

export { visioArticle }

class Comments {
    page
    constructor(page) {
        this.page = page;
    }

    visualcommentButton() {
        return this.page.getByRole('button', { name: 'Post Comment' }).first();
    }
}

export { Comments }


class oneLike {
    page
    constructor(page) {
        this.page = page;
    }

    visualtabLike() {
        return this.page.getByRole('button', { name: '( 1 )' }).first();
    }
}

export { oneLike }

class buttonGlobal {
    page
    constructor(page) {
        this.page = page;
    }

    visualtabButton() {
        return this.page.getByRole('button', { name: '  Global Feed' }).first();
    }
}

export { buttonGlobal }

class filterTag {
    page
    constructor(page) {
        this.page = page;
    }

    visualButton() {
        return this.page.getByRole('button', { name: 'clamo' }).first();
    }
}

export { filterTag }

class visioSettings {
    page
    constructor(page) {
        this.page = page;
    }

    visualButtonSettings(){
        return this.page.getByRole('link', { name: ' Settings' });
    }
}

export { visioSettings }


class visioLogout {
    page
    constructor(page) {
        this.page = page;
    }

    visualButtonLogout() {
        return this.page.getByRole('link', { name: 'Logout' });
    }
}

export { visioLogout }

class visioLogin {
    page
    constructor(page) {
        this.page = page;
    }

    visualButtonLogin() {
        return this.page.getByRole('link', { name: 'Login' });
    }
}

export { visioLogin }

class visioSignUp {
    page
    constructor(page) {
        this.page = page;
    }

    visualButtonSignUp() {
        return this.page.getByRole('link', { name: ' Sign up' });
    }
}

export { visioSignUp }