/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VA404y1eQvq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
    return (
      <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
            <p className="mt-2 text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Data Collection</h2>
            <p className="mt-2 text-muted-foreground">
              We collect certain personal information from you when you use our website or services, such as your name,
              email address, and any other information you provide to us. We may also collect information about your
              device, such as your IP address and browser type.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Data Usage</h2>
            <p className="mt-2 text-muted-foreground">
              We use the information we collect to provide and improve our services, to communicate with you, and to
              comply with legal and regulatory requirements. We may also use your information for marketing purposes, but
              we will always give you the option to opt-out of such communications.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Data Sharing</h2>
            <p className="mt-2 text-muted-foreground">
              We may share your information with third-party service providers who help us operate our business, but we
              will only share the minimum amount of information necessary and we will require those providers to protect
              your information. We will not sell or rent your personal information to any third parties.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Data Security</h2>
            <p className="mt-2 text-muted-foreground">
              We take reasonable measures to protect your personal information from unauthorized access, use, or
              disclosure. However, no method of transmission over the internet or method of electronic storage is 100%
              secure, so we cannot guarantee the absolute security of your information.
            </p>
          </div>
          <div className="pb-20">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Your Rights</h2>
            <p className="mt-2 text-muted-foreground">
              You have certain rights with respect to your personal information, including the right to access, correct,
              or delete your information, and the right to opt-out of certain uses of your information. If you have any
              questions or concerns about our privacy practices, please contact us at privacy@example.com.
            </p>
          </div>
        </div>
      </div>
    )
  }