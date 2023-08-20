import { g, auth, config } from '@grafbase/sdk'

// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min:2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  guthubUrl: g.url().optional(),
  linkedInUrl: g.string().optional(),
  Projects: g.relation(() => project).list().optional(),
}).auth((rules) => {
  rules.public().read()
})

// @ts-ignore
const project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  image: g.url(),
  guthubUrl: g.url(),
  catogory: g.string().search(),
  createdBy: g.relation(() => User)
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update();
})

const jwt = auth.JWT({
  secret: g.env('NEXTAUTH_SECRET'),
  issuer: 'grafbase'
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  }

})
