using RSA.Web.API.Contracts.Common.Request;
using RSA.Web.API.Contracts.Common.Response;
using RSA.Web.API.Contracts.Argos.Request;
using RSA.Web.API.Contracts.Argos.Response;
using RSA.Web.API.Controllers.Common;
using System.Web.Http;
using System;

namespace RSA.Web.API.Controllers.Argos
{
    public class ArgosPetController : RSABaseController
    {
        [HttpGet]
        public IHttpActionResult ping()
        {
            return Json("this is argos Pet..!");
        }

        [HttpPost]
        public IHttpActionResult AfterCallPet(AfterCallPetCommonRequest req)
        {
            try { req.validateRequest(); } catch (Exception ex) { return Json(SendErrorResponse(ex.Message, "Argos AfterCallPet")); } 

            AfterCallCommonResponse cRes = null;
            cRes = IArgosPetProcess.AfterCall(req);
            return Json(cRes);
        }

        [HttpPost]
        public IHttpActionResult AllDropDownList(Contracts.Common.Request.BaseRequest req)
        {
            try { req.validateRequest(ignoreProcessName:true); } catch (Exception ex) { return Json(SendErrorResponse(ex.Message, "Argos AllDropDownList")); }

            //if (string.IsNullOrEmpty(req.ProcessName))
            //{
            //    return null;
            //}
            AllDropDownListResponse cRes = IArgosPetProcess.AllDropDownList(req);
            return Json(cRes);
        }

        [HttpPost]
        public IHttpActionResult MakePetCancellation(PetCancellationRequest req)
        {
            try { req.validateRequest(); } catch (Exception ex) { return Json(SendErrorResponse(ex.Message, "Argos MakePetCancellation")); }

            ProcessResponse cRes = IArgosPetProcess.MakePetCancellation(req);
            return Json(cRes);
        }

        [HttpPost]
        public IHttpActionResult GetPetPolicyDetails(Contracts.Argos.Request.SearchRequest req)
        {
            try { req.validateRequest(ignoreProcessName:true); } catch (Exception ex) { return Json(SendErrorResponse(ex.Message, "Argos GetPetPolicyDetails")); }

            PolicyPetResponse cRes = IArgosPetProcess.GetPetPolicyDetails(req);
            return Json(cRes);
        }

        [HttpPost]
        public IHttpActionResult GetPetPolicyClaimDetails(Contracts.Argos.Request.SearchRequest req)
        {
            try { req.validateRequest(ignoreProcessName:true); } catch (Exception ex) { return Json(SendErrorResponse(ex.Message, "Argos GetPetPolicyClaimDetails")); }

            PolicyPetClaimResponse cRes = IArgosPetProcess.GetPetPolicyClaimDetails(req);
            return Json(cRes);
        }

        [HttpPost]
        public IHttpActionResult ExecuteAISPaymentWorkFlow(PaymentMessageRequest req)
        {
            try { req.validateRequest(); } catch (Exception ex) { return Json(SendErrorResponse(ex.Message, "Argos ExecuteAISPaymentWorkFlow")); }

            _APILogger.DebugFormat("incoming request for AIS Payment {0}", req.RSA_policy_reference);
            PaymentMessageResponse res = IArgosPetProcess.SendPaymentDetailsToAIS(req);
            return Json(res);
        }
    }
}
