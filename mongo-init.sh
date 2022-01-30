db.createUser(
        {
            user: "root",
            pwd: "6nGDVJsEr69A6Len",
            roles: [
                {
                    role: "readWrite",
                    db: "tvvf"
                }
            ]
        }
)
db.createCollection("Indexes",
  {
   autoIndexId: true,
  }
)