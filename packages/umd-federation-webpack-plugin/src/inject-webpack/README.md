``` js
I will implement the UmdFederationPlugin, I think it is significant, it will be compatible with webapck4 and 5, the usage is as follows
new ModuleFederation({
   remotes: {
     app1: "app1@http://",
     app2: "app2@http://",
     app3: "app3@http://"
   }
}),
app2 and app3 will be introduced in the form of umd, and get dependencies from shareScope
new UmdFederationPlugin({
   umds: ["app2", "app3"],
   deps: {
    refShares: ["react"],
    refRemotes: ["app3"]
   },
})
```