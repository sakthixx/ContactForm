const Services = () => {
    const services = [
      {
        title: "Basic Review",
        price: "Starting from $49",
        features: [
          "Grammar & spelling check",
          "Formatting optimization",
          "ATS compatibility check",
          "48-hour turnaround"
        ]
      },
      {
        title: "Premium Review",
        price: "Starting from $99",
        features: [
          "Everything in Basic +",
          "Industry-specific feedback",
          "Keyword optimization",
          "Content restructuring",
          "24-hour turnaround"
        ]
      },
      {
        title: "Executive Package",
        price: "Starting from $149",
        features: [
          "Everything in Premium +",
          "LinkedIn profile review",
          "Cover letter review",
          "Unlimited revisions",
          "12-hour rush service"
        ]
      }
    ];
  
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-2xl text-blue-600 mb-4">{service.price}</p>
              <ul className="list-disc pl-5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Services;