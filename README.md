## What This Is

This is a very very rough proof of concept implementation built using ReactJS, Next.js 13 (with new, currently experimental app directory) and [craft.js](https://craft.js.org/docs/overview "craft.js"), in which the objectives are to prove : 

1. Implement a new component that can be drag-and-dropped into a website UI editor, and its attributes customized during runtime, using the craft.js library
2. Dynamically bind data of other components on events such as onClick, during runtime
3. Copy and paste GraphQL query into a component editor sidebar during runtime and bind query to component during runtime
4. Save page layout state, including all attributes, dynamically bound GraphQL query, etc. and prove that the entire layout can be reloaded via a JSON string (which is encoded and compressed). This means the string that represents the page layout, along with a dynamic URL route, could be created dynamically during runtime and saved into a database, essentially proving you could build an entire website with all its routes during runtime using this editor

While the implementation is rough the framework is there, so you can use this project as a base for your own project if you want. 

## Proof of Concept

Clone the repository and download dependencies using `npm i` in the project directory. Use `npm run dev` to start the app. 
This sample uses Apollo Client to implement a dynamic GraphQL query. My test backend has auth built-in, so I have a `.env` file with username and password. *These variables are public, and therefore is not meant to be used in production. You should implement the actual login functionality and use tokens instead.*

You also need to modify the GraphQL endpoint in `\craftjs-website-generator\graphql\apollo-client.ts` and `\craftjs-website-generator\graphql\errorLink.ts`. *Yes this should be a env variable; like I said, very very rough implementation*.


Open [http://localhost:3000](http://localhost:3000) with your browser to access the editor. 

![alt text](https://github.com/johnkm516/Craft-Frontend-Editor/blob/base/assets/1.png?raw=true)

- The left sidebar contains icons of components. Drag and drop a component into the canvas to create a new component node. 
- The topbar contains `Undo`, `Redo`, `Copy State`, `Load State` buttons. You can click `Copy State` which copies an encoded JSON string that represents the current page layout into your clipboard. You can then use `Load State` to paste this string load your layout.
- The right sidebar contains the component hierarchy and component attribute editor. You can select a component which reveals a set of customizers depending on which component you select. 

### Proof 1 : Dynamically bind data changes on events

I created an attribute customizer called `Update From Node` for Text component and Button component. My implementation sets the editor's node ID (unique ID which represents a specific component called `nodes`) as the `id` attribute on the DOM. Open your browser's developer console (F12 on Chrome and Edge), and use the element selector to select a Text component : 

![alt text](https://github.com/johnkm516/Craft-Frontend-Editor/blob/base/assets/2.png?raw=true)

The text node I selected has a node id of `7ptPPnp5ht`. 

Select / create another Text node on the editor. This node will listen for data changes of another Text node (in my case `7ptPPnp5ht`), and change its value to this node's value. Copy and paste the node id into the `Update From Node` customizer in the right sidebar and press enter : 

![alt text](https://github.com/johnkm516/Craft-Frontend-Editor/blob/base/assets/3.png?raw=true)

Select / create a Button node on the editor. This Button node will propagate the `Update From Node` when clicked. Same as above, copy and paste the node id into the `Commit From Node` customizer of the Button node and press enter : 

![alt text](https://github.com/johnkm516/Craft-Frontend-Editor/blob/base/assets/4.png?raw=true)

Click on the button in the canvas. The text node will update its value to the node that it is listening to! 

![alt text](https://github.com/johnkm516/Craft-Frontend-Editor/blob/base/assets/5.png?raw=true)

This functionality is implemented using Redux. You can customize this functionality however you wish, such as query backend data on button click and update a different component, or implement it some other way without using Redux if you do not like how I implemented it. 

### Proof 2 : Dynamically bind GraphQL query 

I created a new component using MUI datatable. You need to first modify the data binding in the source code as I hard-coded this portion. 
In `\craftjs-website-generator\components\selectors\DataGrid\index.tsx`, I added the relevant comments : 

```
(<DataGrid
    components={{
        Toolbar: GridToolbar,
        NoRowsOverlay: CustomNoRowsOverlay,
    }}

    /*
    My query that I input in the editor during runtime : 
    query Query {
        Auth_findManyUser {
            id
            lastName
            firstName
        }
    }

    The result of that query : 
    {
        "data": {
            "Auth_findManyUser": [
                {
                    "id": 1,
                    "lastName": "Kim",
                    "firstName": "John"
                },
                {
                    "id": 3,
                    "lastName": "Lee",
                    "firstName": "Bob"
                }
            ]
        }
    }
    */
    //I hard-coded the data access here, but you can add another component customizer in the sidebar to access data during runtime, or parse the input GraphQL query. 
    //It all depends on your resolver and what your query result looks like.
    columns={data.Auth_findManyUser.map((element: any) => (
        Object.keys(element).map(key => {
        return { field: key, width: 150 }
        })
    ))[0]}  
    rows={[]} 
/>)}
```

The above code creates new columns in the table dynamically from the GraphQL query during runtime. You can add additional customizers to bind certain columns, rows, as well as add a variables customizer within the editor that listen for values of other nodes. How you implement that is up to you. As a proof of concept my implementation does not have dynamic args for queries.  

As per my comments in the code above, if I copy and paste the query into the `GraphQL` customizer of the DataTable node,

```
query Query {
    Auth_findManyUser {
        id
        lastName
        firstName
    }
}
```

the columns of the data table are populated dynamically during runtime : 

![alt text](https://github.com/johnkm516/Craft-Frontend-Editor/blob/base/assets/6.png?raw=true)

### Proof 3 : Save state and reload state, including all attributes and dynamic binding from Proof 1 and Proof 2. 

1. Customize your page layout - add new component nodes, color, resize, and edit `Commit From Node`, `Update From Node` or GraphQL query in the customizers for nodes. 
2. Click on the `Copy State` button. This saves the state as a encoded JSON string into your clipboard. 
3. Reload the page. Reloading the page will reset the editor and the page layout to the default layout. 
4. Click on the `Load State` button. Paste the JSON string from step 2 and press `Load`. 
5. Notice that the page layout loads to the state of the layout from step 2! 

This means that :

- Instead of `Copy State`, modify the functionality to save state to a DB instead, along with a page route, all during runtime. You could add "last modified" and "modified by" columns to your database table and save / load previous version of pages.
- Implementing a dynamic router which routes URLs to page layouts from the DB during runtime means you can create entire websites using this editor without any coding, provided you implement all the components and customizers you need beforehand, and add a "Add page with route" functionality.




