import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import UserChat from "pages/UserChat/UserChat";
import TenantVisitListings from "pages/TenantVisitListings/TenantVisitListings";
import PropertyDetail from "pages/PropertyDetail/PropertyDetail";
import UserProperties from "layouts/UserProperties/UserProperties"
import AllBookings from "pages/AllBookings/AllBookings";
import MyApartments from "pages/MyApartments/MyApartments";
import RentDetails from "pages/RentDetails/RentDetails";
const License = React.lazy(() => import("pages/License"));
const PrivacyPolicy = React.lazy(() => import("pages/PrivacyPolicy"));
const FAQ = React.lazy(() => import("pages/FAQ"));
const Error = React.lazy(() => import("pages/Error"));
const BlogDetails = React.lazy(() => import("pages/BlogDetails"));
const BlogPage = React.lazy(() => import("pages/BlogPage"));
const ContactPage = React.lazy(() => import("pages/ContactPage"));
const AgentProfile = React.lazy(() => import("pages/AgentProfile"));
const AgentList = React.lazy(() => import("pages/AgentList"));
const PropertyDetails = React.lazy(() => import("pages/PropertyDetails"));
const ListingMapView = React.lazy(() => import("pages/ListingMapView"));
const Listing = React.lazy(() => import("pages/Listing"));
const AboutUs = React.lazy(() => import("pages/AboutUs"));
const LandingPage = React.lazy(() => import("pages/LandingPage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/properties" element={<Listing />} />
          <Route path="/chat/:ownerId" element={<UserChat />} />
          <Route path="/listingmapview" element={<ListingMapView />} />
          <Route path="/propertydetails/:id" element={<PropertyDetails />} />
          <Route path="/propertydetails" element={<PropertyDetails />} />
          <Route path="/propertydetail/:id" element={<PropertyDetail/>} />
          <Route path="/agentlist" element={<AgentList />} />
          <Route path="/agentprofile" element={<AgentProfile />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
          <Route path="/error" element={<Error />} />
          <Route path="/scheduled-visits" element={<TenantVisitListings />} />
          <Route path="/my-properties" element={<UserProperties/>}>
            <Route path="" element={<MyApartments />} />
            <Route path=":rent_id" element={<RentDetails />} />
            <Route path="all-bookings" element={<AllBookings />} />
          </Route>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/license" element={<License />} />
          <Route path="/dhiwise-dashboard" element={<Home />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
