const PrivacyPolicy = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-6 text-gray-700">Last Updated: March 14, 2025</p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Viben ("we," "our," or "us"), a social networking platform designed to connect people. We are committed to protecting your privacy and personal information.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
          website and services.
        </p>
        <p className="mb-4">By accessing or using Viben, you agree to this Privacy Policy.</p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
  
        <h3 className="text-lg font-medium mt-4 mb-2">2.1 Personal Information</h3>
        <p className="mb-4">We collect personal information that you voluntarily provide when you:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Register for an account</li>
          <li className="mb-2">Complete your profile</li>
          <li className="mb-2">Connect with other users</li>
          <li className="mb-2">Send connection requests</li>
          <li className="mb-2">Purchase premium features or subscriptions</li>
        </ul>
  
        <p className="mb-4">Personal information may include:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">First and last name</li>
          <li className="mb-2">Email address</li>
          <li className="mb-2">Age and Gender</li>
          <li className="mb-2">Profile picture</li>
          <li className="mb-2">Location</li>
          <li className="mb-2">Payment information (processed securely by Razorpay)</li>
        </ul>
  
        <h3 className="text-lg font-medium mt-4 mb-2">2.2 Automatically Collected Information</h3>
        <p className="mb-4">When you use our platform, we automatically collect certain data, such as:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">IP address</li>
          <li className="mb-2">Device and browser information</li>
          <li className="mb-2">Access logs</li>
          <li className="mb-2">Usage patterns</li>
          <li className="mb-2">Connection and interaction preferences</li>
        </ul>
  
        <h3 className="text-lg font-medium mt-4 mb-2">2.3 Cookies and Tracking</h3>
        <p className="mb-4">
          We use cookies and similar tracking technologies to improve user experience and analyze platform usage. You can manage cookie settings in
          your browser preferences.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">To create and maintain your account</li>
          <li className="mb-2">To facilitate connections between users</li>
          <li className="mb-2">To personalize your experience on our platform</li>
          <li className="mb-2">To process payments and subscriptions securely</li>
          <li className="mb-2">To improve our platform's features and user experience</li>
          <li className="mb-2">To send updates, notifications, and security alerts</li>
          <li className="mb-2">To prevent fraud and enforce our policies</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing Your Information</h2>
        <h3 className="text-lg font-medium mt-4 mb-2">4.1 With Other Users</h3>
        <p className="mb-4">
          Certain profile information (such as your name, picture, and interests) may be visible to other users on the
          platform based on your privacy settings.
        </p>
  
        <h3 className="text-lg font-medium mt-4 mb-2">4.2 With Third-Party Services</h3>
        <p className="mb-4">We may share necessary data with:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Payment processors (Razorpay)</li>
          <li className="mb-2">Analytics providers</li>
          <li className="mb-2">Cloud hosting services</li>
          <li className="mb-2">Customer support tools</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We implement strong security measures including encryption, access controls, and regular security assessments to protect your personal information. However, no internet transmission is
          100% secure, and we cannot guarantee absolute security.
        </p>

  
        <h2 className="text-xl font-semibold mt-6 mb-2">7. International Data Transfers</h2>
        <p className="mb-4">
          Your information may be transferred to and processed in countries other than your country of residence, which may have different data protection laws.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">8. Data Retention</h2>
        <p className="mb-4">
          We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to this Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
        <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p className="mb-4">Email: <a href="mailto:privacy@viben.com" className="text-blue-600">privacy@viben.com</a></p>
        <p className="mb-4">Address: Viben Technologies Pvt. Ltd., 123 Innovation Street, Tech Hub, Bangalore - 560001</p>
  
        <p className="mt-6 font-medium">By using Viben, you acknowledge that you have read and understand this Privacy Policy.</p>
      </div>
    );
  };
  
  export default PrivacyPolicy;