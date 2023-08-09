import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/user/home/Home.vue')
const Vehicles = () => import('../views/user/home/Vehicles.vue')
const ContactUs = () => import('../views/user/home/ContactUs.vue')
const FAQs = () => import('../views/user/home/FAQs.vue')
const Login = () => import('../views/user/login/Login.vue')
const Profile = () => import('../views/user/profile/Profile.vue')
const Book = () => import('../views/user/book/Book.vue')
const Onboard = () => import('../views/user/onboard/Onboard.vue')
const Bookings = () => import('../views/user/bookings/Bookings.vue')
const NotFound = () => import('../views/user/NotFound.vue')

const Admin = () => import('../views/admin/Admin.vue')
const Dashboard = () => import('../views/admin/dashboard/Dashboard.vue')
const AdminBookings = () => import('../views/admin/bookings/Bookings.vue')
const Messages = () => import('../views/admin/messages/Messages.vue')
const Subscribers = () => import('../views/admin/subscribers/Subscribers.vue')
const AdminVehicles = () => import('../views/admin/vehicles/Vehicles.vue')
const AddVehicle = () => import('../views/admin/vehicles/AddVehicle.vue')
const ManageVehicles = () => import('../views/admin/vehicles/ManageVehicles.vue')
const WorkOrder = () => import('../views/admin/workorder/WorkOrder.vue')
const ManageWorkOrder = () => import('../views/admin/workorder/ManageWorkOrder.vue')
const AddWorkOrder = () => import('../views/admin/workorder/AddWorkOrder.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/vehicles', component: Vehicles },
  { path: '/contactus', component: ContactUs },
  { path: '/faqs', component: FAQs },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/onboard', component: Onboard },
  { path: '/bookings', component: Bookings },
  { path: '/book/:vehicleId', component: Book, name: 'Book' },
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/admin', component: Admin, name: 'Admin', redirect: '/admin/dashboard', 
    children: [
    { path: 'admin/vehicles/manage', component: ManageVehicles, redirect: '/admin/vehicles/manage'},
    { path: 'admin/vehicles/add', component:AddVehicle, redirect: '/admin/vehicles/add'},
    { path: 'admin/workorder/manage', component: ManageVehicles, redirect: '/admin/workorder/manage'},
    { path: 'admin/workorder/add', component:AddVehicle, redirect: '/admin/workorder/add'},
    { path: 'dashboard', component: Dashboard },
    { path: 'bookings', component: AdminBookings },
    { path: 'messages', component: Messages },
    { path: 'subscribers', component: Subscribers },
    { path: 'vehicles', component: AdminVehicles, name: 'AdminVehicles', children: [
      { path: 'add', component: AddVehicle },
      { path: 'manage', component: ManageVehicles},
      { path: 'bookings', component: AdminBookings, redirect: '/admin/bookings'},
      { path: 'messages', component: Messages, redirect: '/admin/messages'},
      { path: 'subscribers', component: AdminBookings, redirect: '/admin/subscribers'},
    ]},
    { path: 'workorder', component: WorkOrder, name: 'WorkOrder', children: [
      { path: 'manage', component: ManageWorkOrder },
      { path: 'add', component: AddWorkOrder },
      { path: 'bookings', component: AdminBookings, redirect: '/admin/bookings'},
      { path: 'messages', component: Messages, redirect: '/admin/messages'},
      { path: 'subscribers', component: AdminBookings, redirect: '/admin/subscribers'},
    ]},
  ] }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
